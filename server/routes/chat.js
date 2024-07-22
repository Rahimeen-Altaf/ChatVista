import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { atachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be authenticated

app.use(isAuthenticated);

// Create new Group Chat
app.post("/new", newGroupChat);

// Get My Profile
app.get("/my", getMyChats);

// Get My Groups
app.get("/my/groups", getMyGroups);

// Add Members to Group
app.put("/addmembers", addMembers);

// Remove Member from Group
app.put("/removemembers", removeMember);

// Leave Group
app.delete("/leave/:id", leaveGroup);

// Send Attachments
app.post("/message", atachmentsMulter, sendAttachments);

// Get Messages
app.get("/message/:id", getMessages)

// Get Chat Details, Rename, Delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
