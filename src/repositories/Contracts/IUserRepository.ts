import { User } from "@prisma/client";
import { UserRegisterRequest } from "../../types";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByPublicId(public_id: string): Promise<User | null>;
  convertPublicIdToId(public_id: string): Promise<{ id: number } | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(data: UserRegisterRequest): Promise<User>;
  isEmailAlreadyRegistered(email: string): Promise<boolean>;
}
