import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
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

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemembers", removeMember);

app.delete("/leave/:id", leaveGroup);

// Send Attachments
app.post("/message", atachmentsMulter, sendAttachments);

// Get Messages

// Get Chat Details, Rename, Delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
