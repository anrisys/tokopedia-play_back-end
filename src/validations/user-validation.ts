import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z
    .object({
      email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
      password: z
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
        }),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });
}

export type CreateUserInput = z.infer<typeof UserValidation.REGISTER>;
