import { generateToken } from "../config/jwt";
import * as UserRepo from "../models/user";
import { User } from "../validators/userValidator";
import bcrypt from "bcrypt";

export async function registerUser(user: User) {
  const existingEmail = await UserRepo.getUserByEmail(user.email);
  if (existingEmail) {
    throw new Error("Email already in use.");
  }

  const existingUsername = await UserRepo.getUserByUsername(user.username);
  if (existingUsername) {
    throw new Error("Username already in use.");
  }

  return UserRepo.createUser(user);
}

export async function login(email: string, password: string) {
  const user = await UserRepo.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password.");
  }

  const token = generateToken(user);
  return { token };
}
