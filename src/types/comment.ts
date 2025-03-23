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
