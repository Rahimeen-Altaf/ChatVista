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

const app = express.Router();

// http://localhost:3000/user/new
app.post("/new", singleAvatar, newUser);

// http://localhost:3000/user/login
app.post("/login", login);

// After here user must be authenticated

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.get("/logout", logout);

app.get("/search", searchUser);

export default app;
