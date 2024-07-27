import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { CHATVISTA_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[CHATVISTA_TOKEN];

  if (!token) return next(new ErrorHandler("User not authenticated", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decodedData._id;
  next();
});

const isAdmin = (req, res, next) => {
  const token = req.cookies["chatvista-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

const socketAuthenticator = async (error, socket, next) => {
  try {
    if (error) return next(error);

    const authToken = socket.request.cookies[CHATVISTA_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("User not authenticated", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new ErrorHandler("User not authenticated", 401));

    socket.userId = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("User not authenticated", 401));
  }
};

export { isAdmin, isAuthenticated, socketAuthenticator };

