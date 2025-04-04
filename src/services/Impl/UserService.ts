import { User } from "@prisma/client";
import {
  CreateUserInput,
  ListUsersOptions,
  PublicUserProfile,
  UpdateUserInput,
} from "../../types";
import { IUserService } from "../Contracts/IUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types/inversifyTypes";
import { IUserRepository } from "../../repositories";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async listUsers(
    options?: ListUsersOptions
  ): Promise<{ users: PublicUserProfile[]; total: number }> {
    const { users, total } = await this.userRepository.listUsers(
      {
        role: options?.role,
        search: options?.searchQuery,
      },
      {
        page: options?.page,
        perPage: options?.limit,
      }
    );

    const publicUsers = users.map((user) => ({
      public_id: user.public_id,
      email: user.email,
      created_at: user.created_at,
    }));

    return { users: publicUsers, total };
  }

  updateUser(public_id: string, data: UpdateUserInput): Promise<User> {
    throw new Error("Method not implemented.");
  }
  showUser(public_id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  createUser(data: CreateUserInput): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
