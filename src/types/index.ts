import { CommentResponse, CreateCommentRequest } from "./comment";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../validations/UserValidation";
import { CreateVideoRequest, VideoListResponse, VideoResponse } from "./video";
import {
  ListUsersOptions,
  PublicUserProfile,
  UserRegisterRequest,
} from "./user";

export { CreateUserInput, UpdateUserInput };
export { CommentResponse, CreateCommentRequest };
export { CreateVideoRequest, VideoListResponse, VideoResponse };

export { ListUsersOptions, PublicUserProfile, UserRegisterRequest };

export type PaginationData = {
  page?: number;
  perPage?: number;
};
