import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  toVideoResponse,
  VideoListResponse,
  VideoResponse,
} from "../models/video-model";
import { Validation } from "../validations/validation";
import { VideoValidation } from "../validations/video-validation";

export class VideoService {
  static async index(): Promise<Array<VideoListResponse>> {
    return await prismaClient.videos.findMany({
      select: {
        id: true,
        title: true,
        url_thumbnail: true,
      },
    });
  }

  static async getVideoDetails(videoId: string): Promise<VideoResponse> {
    const id = Validation.validate(VideoValidation.GETVIDEO, videoId);

    const video = await prismaClient.videos.findUnique({
      where: {
        id: id,
      },
    });

    if (!video) {
      throw new ResponseError(404, "Video not found");
    }

    return toVideoResponse(video);
  }
}
