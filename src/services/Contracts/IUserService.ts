import { User } from "@prisma/client";
import {
  CreateUserInput,
  ListUsersOptions,
  PublicUserProfile,
  UpdateUserInput,
} from "../../types";

export interface IUserService {
  createUser(data: CreateUserInput): Promise<User>;
  showUser(public_id: string): Promise<User | null>;
  updateUser(public_id: string, data: UpdateUserInput): Promise<User>;
  listUsers(
    options?: ListUsersOptions
  ): Promise<{ users: PublicUserProfile[]; total: number }>;
}
