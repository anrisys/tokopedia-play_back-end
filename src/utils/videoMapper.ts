import { Videos } from "@prisma/client";
import { VideoResponse } from "../types";

export function toVideoResponse(video: Videos): VideoResponse {
  return {
    id: video.id,
    title: video.title,
    url_thumbnail: video.url_thumbnail,
    url_video: video.url_video,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
  };
}
