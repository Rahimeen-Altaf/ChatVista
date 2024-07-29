import { body, param, validationResult } from "express-validator";
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
    .isArray()
    .withMessage("Members must be an array"),
];

const removeMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("userId", "User ID is required").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
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

const adminLoginValidator = () => [
  body("secretKey", "Secret Key is required").notEmpty(),
];

export {
  acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, sendRequestValidator, validateHandler
};

