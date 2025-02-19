import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment-service";

export class CommentController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const videoId = req.params.videoId;

      const response = await CommentService.index(videoId);

      res.status(200).json({
        status: "success",
        message: "SUCCESSFUL RETRIEVE ALL COMMENTS",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async submitComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;

      const { username, comment } = req.body;

      const response = await CommentService.submitComment({
        videoId,
        username,
        comment,
      });

      res.status(201).json({
        status: "success",
        message: "SUCCESSFUL CREATE NEW COMMENT",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static getVideoId(req: Request): string {
    console.log("getVideoId static method", req.params.videoId);
    const { videoId } = req.params;
    return videoId;
  }
}
