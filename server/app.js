import express from 'express';
import userRoute from './routes/user.js';
import { connectDb } from './utils/features.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDb(mongoURI);

const app = express();

app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send('Hello from the App!');
});      

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});