import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { corsOptions } from "./constants/config.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { socketAuthenticator } from "./middlewares/auth.js";
import { errorMiddleware } from "./middlewares/error.js";
import { Message } from "./models/message.js";
import { connectDb } from "./utils/features.js";

import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "Rahimeen Altaf";
const userSocketIDs = new Map();

connectDb(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// Using Middleware Here
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("ChatVista App!");
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (error) => await socketAuthenticator(error, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.userId;
  console.log(user);

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("a user connected", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log("Error while saving message to DB", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});

export { adminSecretKey, envMode, userSocketIDs };
