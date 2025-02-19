import { Request, Response, NextFunction } from "express";
import { VideoService } from "../services/video-service";

export class VideoController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await VideoService.index();

      res.status(200).json({
        status: "success",
        message: "VIDEOS LIST RETRIEVED SUCCESSFULLY",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const videoId = String(req.params.videoId);

      const response = await VideoService.getVideoDetails(videoId);

      res.status(200).json({
        status: "success",
        message: "VIDEO DETAILS RETRIEVED SUCCESSFULLY",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
