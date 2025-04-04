import { Role } from "@prisma/client";

export type UserRegisterRequest = {
  email: string;
  password: string;
  public_id: string;
};

export type UserUpdateRequest = {
  email: string;
  password: string;
};

export type ListUsersOptions = {
  role?: Role;
  searchQuery?: string;
  page?: number;
  limit?: number;
};

export type PublicUserProfile = {
  public_id: string;
  email: string;
  created_at: Date;
};
