import express from "express";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

// After here user must be authenticated

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemembers", removeMember);

app.delete("/leave/:id", leaveGroup);

// Send Attachments

// Get Messages

// Get Chat Details, Rename, Delete

export default app;
