import { hash } from "bcrypt";
import { prisma } from "../config/db";
import { User, UserSchema } from "../validators/userValidator";
import { MissingFieldError } from "../errors/missingFieldError";
import { ValidationError } from "../errors/validationError";

export async function createUser(user: User) {
  if (!user.email || !user.username || !user.password) {
    throw new MissingFieldError("Email, username, and password are required.");
  }

  const validationResult = UserSchema.safeParse(user);
  if (!validationResult.success) {
    throw new ValidationError("Invalid user data.");
  }

  const hashedPassword = await hash(user.password!, 10);

  return prisma.user.create({
    data: {
      ...user,
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
