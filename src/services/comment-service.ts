import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CommentResponse, CreateCommentRequest } from "../types";
import { toCommentResponse } from "../utils";
import { CommentValidation } from "../validations/comment-validation";
import { Validation } from "../validations/validation";
import { VideoValidation } from "../validations/video-validation";

export class CommentService {
  static async index(videoId: string) {
    const videoID = Validation.validate(VideoValidation.GETVIDEO, videoId);

    const isVideoExist = await prismaClient.videos.findUnique({
      where: { id: videoID },
    });

    if (!isVideoExist) {
      throw new ResponseError(404, "Video not found");
    }

    const comments = prismaClient.comments.findMany({
      where: { videoId: videoId },
    });

    return prismaClient.comments.findMany({
      where: { videoId: videoId },
    });
  }

  static async submitComment(
    request: CreateCommentRequest
  ): Promise<CommentResponse> {
    ``;
    const submittedComment = Validation.validate(
      CommentValidation.SUBMIT,
      request
    );

    const isVideoExists = await prismaClient.videos.findUnique({
      where: { id: submittedComment.videoId },
    });

    if (!isVideoExists) {
      throw new ResponseError(400, "Video not found");
    }

    const comment = await prismaClient.comments.create({
      data: submittedComment,
    });

    return toCommentResponse(comment);
  }
}
