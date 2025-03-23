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
