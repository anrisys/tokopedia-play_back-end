import { Role, User } from "@prisma/client";
import { PaginationData, UserRegisterRequest } from "../../types";
import { UserUpdateRequest } from "../../types/user";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByPublicId(public_id: string): Promise<User | null>;
  convertPublicIdToId(public_id: string): Promise<{ id: number } | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(data: UserRegisterRequest): Promise<User>;
  isEmailAlreadyRegistered(email: string): Promise<boolean>;
  updateUser(userId: number, data: UserUpdateRequest): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  listUsers(
    filters?: { role?: Role; search?: string },
    pagination?: PaginationData
  ): Promise<{ users: User[]; total: number }>;
}
