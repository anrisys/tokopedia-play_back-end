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

// Auth
import {
  LoginRequestData,
  LoginResponseData,
  RegisterRequestData,
} from "./auth";

import { RegisterRequestInput } from "../validations/AuthValidation";

// Auth
export {
  LoginRequestData,
  LoginResponseData,
  RegisterRequestInput,
  RegisterRequestData,
};

export { CreateUserInput, UpdateUserInput };
export { CommentResponse, CreateCommentRequest };
export { CreateVideoRequest, VideoListResponse, VideoResponse };

export { ListUsersOptions, PublicUserProfile, UserRegisterRequest };

export type PaginationData = {
  page?: number;
  perPage?: number;
};
