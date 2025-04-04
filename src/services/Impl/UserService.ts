import bcrypt from "bcrypt";
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
import { BusinessLogicError, NotFoundError } from "../../error/CustomError";
import { uuidv7 } from "uuidv7";
import { toPublicUserData } from "../../utils";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async deleteUser(public_id: string): Promise<void> {
    const user = await this.isUserFound(public_id);

    await this.userRepository.deleteUser(user.id);
  }

  async validateCredentials(
    email: string,
    password: string
  ): Promise<{ user: PublicUserProfile } | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    return isValid ? { user: toPublicUserData(user) } : null;
  }

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

  async updateUser(public_id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.isUserFound(public_id);

    const updatedUser = await this.userRepository.updateUser(user.id, {
      email: data.email,
      password: data.password,
    });

    return updatedUser;
  }

  async showUser(public_id: string): Promise<PublicUserProfile> {
    const user = await this.isUserFound(public_id);

    return toPublicUserData(user);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const isEmailAlreadyRegistered =
      await this.userRepository.isEmailAlreadyRegistered(data.email);

    if (isEmailAlreadyRegistered) {
      throw new BusinessLogicError("Email is already registered");
    }

    const public_id = uuidv7();
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(process.env.SALT_ROUNDS)
    );

    return await this.userRepository.createUser({
      email: data.email,
      password: hashedPassword,
      public_id: public_id,
    });
  }

  private async isUserFound(public_id: string): Promise<User> {
    const user = await this.userRepository.findByPublicId(public_id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
