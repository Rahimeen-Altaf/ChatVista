import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chatvista-token"];

  if (!token) return next(new ErrorHandler("User not authenticated", 401));

  const decodedData = jwt.verify(token, "process.env.JWT_SECRET");

  req.userId = decodedData._id;
  next();
};

export { isAuthenticated };
