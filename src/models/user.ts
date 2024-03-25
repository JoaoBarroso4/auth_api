import { hash } from "bcrypt";
import { prisma } from "../config/db";
import { User, UserSchema } from "../validators/userValidator";

export async function createUser(user: Partial<User>) {
  if (!user.email || !user.username || !user.password) {
    throw new Error("Email, username, and password are required.");
  }

  const validationResult = UserSchema.safeParse(user);
  if (!validationResult.success) {
    throw new Error("Invalid user data.");
  }

  const hashedPassword = await hash(user.password!, 10);

  return prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    },
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export function updateUser(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}
