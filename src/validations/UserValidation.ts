import { z } from "zod";

const email = z
  .string()
  .email({ message: "Please enter a valid email address." })
  .transform((email) => email.toLowerCase());

const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must be at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must be at least one lowercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must be at least one number." })
  .regex(/[^A-Za-z0-9]/, {
    message:
      "Password must contain at least one special character like !@#$%^&*",
  });

export class UserValidation {
  static readonly REGISTER = z
    .object({
      email: email,
      password: password,
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });
  static readonly UPDATE = z
    .object({
      email: email,
      password: password,
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });
  static readonly SHOWPROFILE = z.object({
    public_id: z.string().uuid({ message: "Invalid user ID format" }),
  });
}

export type CreateUserInput = z.infer<typeof UserValidation.REGISTER>;
export type UpdateUserInput = z.infer<typeof UserValidation.UPDATE>;
