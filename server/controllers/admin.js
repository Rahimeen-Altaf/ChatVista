import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Invalid Secret Key", 401));

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("chatvista-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Authenticated Successfully as Admin",
    });
});

const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chatvista-admin-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

const allUsers = TryCatch(async (req, res) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const allMessages = TryCatch(async (req, res) => {
  console.log("hello");
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages
    .filter(({ chat, sender }) => chat && sender) // Ensure chat and sender are valid before proceeding
    .map(({ _id, attachments, chat, sender, content, createdAt }) => {
      return {
        _id,
        attachments,
        content,
        createdAt,
        chat: chat._id, // Accessing chat._id only if chat is valid
        groupChat: chat.groupChat,
        sender: {
          _id: sender?._id || "Unknown", // Accessing sender._id only if sender is valid
          name: sender?.name || "Unknown", // Avoid error if name is null or undefined
          avatar: sender?.avatar ? sender.avatar.url : null, // Avoid error if avatar is null or undefined
        },
      };
    });

  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashboardStats = TryCatch(async (req, res) => {
  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments({}),
      Message.countDocuments({}),
      Chat.countDocuments({}),
    ]);

  const today = new Date();

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: { $gte: last7Days, $lte: today },
  }).select("createdAt");

  const messages = new Array(7).fill(0);

  last7DaysMessages.forEach((message) => {
    const index = Math.floor(today.getDate() - message.createdAt.getDate());
    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});

export {
  adminLogin,
  allChats,
  allMessages,
  allUsers,
  getDashboardStats,
  adminLogout,
  getAdminData,
};
