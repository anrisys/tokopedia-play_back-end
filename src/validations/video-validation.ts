import { z, ZodType } from "zod";

export class VideoValidation {
  static readonly GETVIDEO: ZodType = z.string().uuid("Video ID is not valid");
}
