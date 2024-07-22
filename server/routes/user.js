import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";
import { loginValidator, registerValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

// register new user
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);

// login
app.post("/login", loginValidator(), validateHandler, login);

// After here user must be authenticated

app.use(isAuthenticated);

// get my profile
app.get("/me", getMyProfile);

// logout
app.get("/logout", logout);

// search user
app.get("/search", searchUser);

export default app;
