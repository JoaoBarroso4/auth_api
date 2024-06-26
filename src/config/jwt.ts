require("dotenv").config();

import jwt from "jsonwebtoken";
import { UserBD } from "../validators/userValidator";

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be set.");
}

const secret = process.env.JWT_SECRET_KEY;
const tokenExpiry = process.env.TOKEN_EXPIRY || "1h";

export function generateToken(user: UserBD) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: tokenExpiry },
  );
}

export function verifyToken(token: string) {
  try {
    token = token.replace("Bearer ", "");
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}
