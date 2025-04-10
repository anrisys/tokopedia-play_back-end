import express from "express";
import { authRoutes } from "./auth.route";

const publicRouter = express.Router();

publicRouter.use("/api/v1/auth", authRoutes);
/*
publicRouter.get("/api/v1/videos", VideoController.index);
publicRouter.get("/api/v1/videos/:videoId", VideoController.getVideo);

publicRouter.get("/api/v1/videos/:videoId/comments", CommentController.index);
publicRouter.post(
  "/api/v1/videos/:videoId/comments",
  CommentController.submitComment
);
 */

export { publicRouter };
