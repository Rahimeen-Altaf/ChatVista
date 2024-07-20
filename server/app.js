import express from 'express';
import userRoute from './routes/user.js';
import { connectDb } from './utils/features.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

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

app.get('/', (req, res) => {
    res.send('Hello from the App!');
});      

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});