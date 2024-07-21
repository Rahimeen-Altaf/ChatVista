import { TryCatch } from "../middlewares/error.js";
import { ErrorHander } from "../utils/utility.js";
import { Chat } from "../models/Chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(
      new ErrorHander("Group chat must have at least 3 members", 400)
    );

  const allMembers = [...members, req.userId];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.userId,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, {
    message: `New group chat created: ${name}`,
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
    message: transformedChats,
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
    message: groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1)
    return next(new ErrorHander("Members are required", 400));

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHander("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHander("This is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHander("You are not allowed to add members", 403));

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100)
    return next(new ErrorHander("Members limit reached", 400));

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(", ");

  emitEvent(req, ALERT, chat.members, {
    message: `${allUsersName} has been added in the group`,
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

  if (!chat) return next(new ErrorHander("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHander("This is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHander("You are not allowed to remove members", 403));

  if (chat.members.length <= 3)
    return next(
      new ErrorHander(
        "You can't remove members from this group, group must have at least 3 members",
        400
      )
    );

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(req, ALERT, chat.members, {
    message: `${userThatWillBeRemoved.name} has been removed from the group`,
  });

  emitEvent(req, REFETCH_CHATS, chat.members);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHander("chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHander("This is not a group chat", 400));

  if (!chat.members.includes(req.userId))
    return next(new ErrorHander("You are not in the group", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.userId.toString()
  );

  if (remainingMembers.length < 3)
    return next(
      new ErrorHander(
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
  });

  res.status(200).json({
    success: true,
    message: "User left the group successfully",
  });
});

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
};
