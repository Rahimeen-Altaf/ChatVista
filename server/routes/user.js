import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

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

// search other users (not friends)
app.get("/search", searchUser);

// send friend request
app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

// accept friend request
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

// get my notifications
app.get("/notifications", getMyNotifications);

// get my friends & available friends to add in a group chat (who are not in the group chat)
app.get("/friends", getMyFriends);

export default app;
