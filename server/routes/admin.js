import express from "express";
import {
  allChats,
  allUsers,
  allMessages,
  getDashboardStats,
} from "../controllers/admin.js";

const app = express.Router();

app.get("/");

app.post("/vverify");

app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);

export default app;
