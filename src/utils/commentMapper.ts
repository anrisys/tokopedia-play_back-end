import { Comments } from "@prisma/client";
import { CommentResponse } from "../types";

export function toCommentResponse(comment: Comments): CommentResponse {
  return {
    id: comment.id,
    username: comment.username,
    comment: comment.comment,
    createdAt: comment.createdAt,
    videoId: comment.videoId,
  };
}
