import { Comments } from "@prisma/client";

export type CommentResponse = {
  id: string;
  username: string;
  comment: string;
  createdAt: Date;
  videoId: string;
};

export type CreateCommentRequest = {
  videoId: string;
  username: string;
  comment: string;
};

export function toCommentResponse(comment: Comments): CommentResponse {
  return {
    id: comment.id,
    username: comment.username,
    comment: comment.comment,
    createdAt: comment.createdAt,
    videoId: comment.videoId,
  };
}
