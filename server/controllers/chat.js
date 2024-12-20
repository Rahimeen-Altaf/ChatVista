import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import {
  deleteFilesFromCloudinary,
  emitEvent,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  const allMembers = [...members, req.userId];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.userId,
    members: allMembers,
  });

  const chat = await Chat.findOne({ name, members: allMembers });
  const chatId = chat._id;

  emitEvent(req, ALERT, allMembers, {
    message: `New group chat created: ${name}`,
    chatId,
  });
  emitEvent(req, REFETCH_CHATS, members);

  res.status(201).json({
    success: true,
    message: "Group chat created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.userId);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.userId.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.userId,
    groupChat: true,
    creator: req.userId,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1)
    return next(new ErrorHandler("Members are required", 400));

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  const membersLimit = 100 - chat.members.length;
  if (membersLimit < 1)
    return next(new ErrorHandler("Members limit reached", 400));

  if (members.length > membersLimit)
    return next(
      new ErrorHandler(
        `you can only add at most ${membersLimit} members in this group chat`,
        400
      )
    );

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100)
    return next(new ErrorHandler("Members limit reached", 400));

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(", ");

  emitEvent(req, ALERT, chat.members, {
    message: `${allUsersName} has been added in the group`,
    chatId,
  });

  emitEvent(req, REFETCH_CHATS, chat.members);

  res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHandler("You are not allowed to remove members", 403));

  if (chat.members.length <= 3)
    return next(
      new ErrorHandler(
        "You can't remove members from this group, group must have at least 3 members",
        400
      )
    );

  const allChatMembers = chat.members.map((i) => i.toString());

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(req, ALERT, chat.members, {
    message: `${userThatWillBeRemoved.name} has been removed from the group`,
    chatId,
  });

  emitEvent(req, REFETCH_CHATS, allChatMembers);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (!chat.members.includes(req.userId))
    return next(new ErrorHandler("You are not in the group", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.userId.toString()
  );

  if (remainingMembers.length < 3)
    return next(
      new ErrorHandler(
        "You can't leave this group, group must have at least 3 members",
        400
      )
    );

  if (chat.creator.toString() === req.userId.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomElement];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.userId, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, {
    message: `${user.name} has left the group`,
    chatId,
  });

  res.status(200).json({
    success: true,
    message: "Left the group successfully",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("Please Upload Attachments", 400));

  if (files.length > 5)
    return next(new ErrorHandler("You can upload at most 5 files", 400));

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (files.length < 1) return next(new ErrorHandler("No files found", 400));

  // Upload files to cloudinary
  const attachments = await uploadFilesToCloudinary(files);

  const messageForDb = {
    content: "",
    attachments,
    sender: user._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDb,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  const message = await Message.create(messageForDb);

  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  if (req.query.populate === "true") {
    const chat = await Chat.findById(chatId)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(
      new ErrorHandler("You are not allowed to rename this group", 403)
    );

  chat.name = name;

  await chat.save();

  emitEvent(req, ALERT, chat.members, {
    message: `Group chat renamed to ${name}`,
    chatId,
  });

  emitEvent(req, REFETCH_CHATS, chat.members);

  emitEvent;

  res.status(200).json({
    success: true,
    message: "Group chat renamed successfully",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;

  // Permissions check
  if (chat.groupChat && chat.creator.toString() !== req.userId.toString()) {
    return next(
      new ErrorHandler("You are not allowed to delete this group", 403)
    );
  }

  if (!chat.groupChat && !chat.members.includes(req.userId.toString())) {
    return next(
      new ErrorHandler("You are not allowed to delete this chat", 403)
    );
  }

  // Retrieve messages with attachments
  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  // Delete attachments from Cloudinary
  const attachmentsToDelete = messagesWithAttachments.flatMap(
    (message) => message.attachments // An array of Cloudinary public_ids
  );

  if (attachmentsToDelete.length > 0) {
    try {
      const deleteResults = await deleteFilesFromCloudinary(
        attachmentsToDelete
      );
      console.log("Deleted attachments:", deleteResults);
    } catch (error) {
      return next(
        new ErrorHandler(`Error deleting attachments: ${error.message}`, 500)
      );
    }
  }

  // Delete messages from the database
  await Message.deleteMany({ chat: chatId });

  // Finally, delete the chat
  await Chat.findByIdAndDelete(chatId);

  res.status(200).json({
    success: true,
    message: "Chat and its messages have been successfully deleted",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;

  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));

  if (!chat.members.includes(req.userId.toString()))
    return next(new ErrorHandler("You are not allowed to view this chat", 403));

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultPerPage)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

  res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
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
};
