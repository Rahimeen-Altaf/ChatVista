import express from 'express';
import { login, newUser } from '../controllers/user.js';


const app = express.Router();

// http://localhost:3000/user/new
app.post('/new', newUser);
// http://localhost:3000/user/login
app.post('/login', login);

export default app;  