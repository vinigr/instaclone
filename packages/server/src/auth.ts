import jwt from "jsonwebtoken";
import { config } from "./config";

import { UserDocument } from "./modules/user/UserModel";

export const generateToken = (user: UserDocument) => {
  return `${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
};
