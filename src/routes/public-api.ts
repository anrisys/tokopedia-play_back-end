import express from "express";
import { CommentController } from "../controllers/comment-controller";
import { VideoController } from "../controllers/video-controller";

export const publicRouter = express.Router();

publicRouter.get("/api/v1/videos", VideoController.index);
publicRouter.get("/api/v1/videos/:videoId", VideoController.getVideo);

publicRouter.get("/api/v1/videos/:videoId/comments", CommentController.index);
publicRouter.post(
  "/api/v1/videos/:videoId/comments",
  CommentController.submitComment
);
