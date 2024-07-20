import express from 'express';
import { login, newUser } from '../controllers/user.js';
import { singleAvatar } from '../middlewares/multer.js';


const app = express.Router();

// http://localhost:3000/user/new
app.post('/new', singleAvatar, newUser);
// http://localhost:3000/user/login
app.get('/login', login);


// After here user must be authenticated

export default app;