import { User } from "@prisma/client";
import { PublicUserProfile } from "../types";

export function toPublicUserData(user: User): PublicUserProfile {
  return {
    public_id: user.public_id,
    email: user.email,
    created_at: user.created_at,
  };
}
