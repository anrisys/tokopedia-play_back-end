import { Videos } from "@prisma/client";

export type VideoResponse = {
  id: string;
  title: string;
  url_thumbnail: string;
  url_video: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VideoListResponse = {
  id: string;
  title: string;
  url_thumbnail: string;
};

export type CreateVideoRequest = {
  title: string;
  url_thumbnail: string;
  url_video: string;
};

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
