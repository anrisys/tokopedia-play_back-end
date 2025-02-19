import { prismaClient } from "../src/application/database";

export class CommentTest {
  static async delete() {
    await prismaClient.comments.deleteMany();

    await VideoTest.delete();
  }

  static async create(videoId: string) {
    // const video = await prismaClient.videos.create({
    //   data: { title: "test", url_thumbnail: "test", url_video: "test" },
    // });

    return await prismaClient.comments.create({
      data: {
        videoId: videoId,
        username: "test",
        comment: "test",
      },
    });
  }
}

export class VideoTest {
  static async create() {
    return await prismaClient.videos.create({
      data: { title: "test", url_thumbnail: "test", url_video: "test" },
    });
  }

  static async delete() {
    await prismaClient.videos.deleteMany();
  }
}
