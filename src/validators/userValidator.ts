import { z } from "zod";

export const UserBDSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: "Invalid email address." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  password: z
    .string()
    .min(8)
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      },
    ),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  password: z
    .string()
    .min(8)
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      },
    ),
});

export type UserBD = z.infer<typeof UserBDSchema>;
export type User = z.infer<typeof UserSchema>;
