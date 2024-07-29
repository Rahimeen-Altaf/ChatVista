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
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

// After here user must be authenticated

app.use(isAuthenticated);

// Create new Group Chat
app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

// Get My chats
app.get("/my", getMyChats);

// Get My Groups
app.get("/my/groups", getMyGroups);

// Add Members to Group
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

// Remove Member from Group
app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

// Leave Group
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
app.post(
  "/message",
  atachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

// Get Messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get Chat Details, Rename, Delete
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
