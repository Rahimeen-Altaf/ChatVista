import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "ChatVista" })
    .then((data) => {
      console.log(`Connected to the database: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`Error connecting to the database. \n${err}`);
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, "process.env.JWT_SECRET");

  return res.status(code).cookie("chatvista-token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
    console.log("Emitting event", event);
};

export { connectDb, sendToken, cookieOptions, emitEvent };
