import { generateToken } from "../config/jwt";
import * as UserRepo from "../models/user";
import { User } from "../validators/userValidator";
import bcrypt from "bcrypt";
import { UserNotFoundError } from "../errors/userNotFoundError";

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
    throw new UserNotFoundError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password.");
  }

  const token = generateToken(user);
  return { token };
}

export async function getUserByUsername(username: string) {
  const user = await UserRepo.getUserByUsername(username);
  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}

export async function updateUser(id: string, data: Partial<User>) {
  const existingUser = await UserRepo.getUserById(id);
  if (!existingUser) {
    throw new UserNotFoundError();
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return UserRepo.updateUser(id, data);
}

export async function deleteUserByUsername(username: string) {
  const existingUser = await UserRepo.getUserByUsername(username);
  if (!existingUser) {
    throw new UserNotFoundError();
  }

  return UserRepo.deleteUser(existingUser.id);
}
