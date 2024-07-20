import jwt from "jsonwebtoken";
import { ErrorHander } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chatvista-token"];

  if (!token) return next(new ErrorHander("User not authenticated", 401));

  const decodedData = jwt.verify(token, "process.env.JWT_SECRET");

  req.userId = decodedData._id;
  next();
};

export { isAuthenticated };
