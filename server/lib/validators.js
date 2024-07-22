import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("username", "Username is required").notEmpty(),
  body("bio", "Bio is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
  check("avatar", "Avatar is required").notEmpty(),
];

const loginValidator = () => [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 2, max: 99 })
    .withMessage("Members must be between 2 and 99"),
];

const addMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 1 and 97"),
];

const removeMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("userId", "User ID is required").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please Upload Attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("Attachments must be between 1 and 5"),
];

const chatIdValidator = () => [param("id", "Chat ID is required").notEmpty()];

const renameGroupValidator = () => [
  param("id", "Chat ID is required").notEmpty(),
  body("name", "Name is required").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "User ID is required").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Request ID is required").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Accept is required")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

export {
  addMemberValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  validateHandler,
  renameGroupValidator,
  sendRequestValidator,
  acceptRequestValidator,
};
