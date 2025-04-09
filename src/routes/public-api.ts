import express from "express";
import { CommentController } from "../controllers/comment-controller";
import { VideoController } from "../controllers/video-controller";
import { validate } from "../middlewares/validation.middleware";
import { AuthValidation } from "../validations/AuthValidation";
import { AuthController } from "../controllers";
import { container } from "../container";
import { TYPES } from "../types/inversifyTypes";

export const publicRouter = express.Router();

const authController = container.get<AuthController>(TYPES.AuthController);

publicRouter.post(
  "/api/v1/auth/register",
  validate({ body: AuthValidation.REGISTER }),
  authController.register
);

publicRouter.get("/api/v1/videos", VideoController.index);
publicRouter.get("/api/v1/videos/:videoId", VideoController.getVideo);

publicRouter.get("/api/v1/videos/:videoId/comments", CommentController.index);
publicRouter.post(
  "/api/v1/videos/:videoId/comments",
  CommentController.submitComment
);
