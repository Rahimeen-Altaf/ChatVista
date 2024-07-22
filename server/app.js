import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { errorMiddleware } from './middlewares/error.js';
import { connectDb } from './utils/features.js';

import chatRoute from './routes/chat.js';
import userRoute from './routes/user.js';
import { createMessagesInAChat } from "./seeders/chat.js";

dotenv.config({
    path: './.env'
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDb(mongoURI);

const app = express();

// Using Middleware Here
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get('/', (req, res) => {
    res.send('Hello from the App!');
});      

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});