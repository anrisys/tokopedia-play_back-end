import { z, ZodType } from "zod";

export class CommentValidation {
  static readonly SUBMIT: ZodType = z.object({
    videoId: z.string().uuid("Video ID is not valid"),
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(100, { message: "Username cannot exceed 100 characters" }),
    comment: z
      .string()
      .min(1, { message: "Comment is required" })
      .max(255, { message: "Comment cannot exceed 255 characters" }),
  });
}
