import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../Contracts/IUserRepository";
import { UserRegisterRequest } from "../../types";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByPublicId(public_id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        public_id: public_id,
      },
    });
  }

  async convertPublicIdToId(public_id: string): Promise<{ id: number } | null> {
    return await this.prisma.user.findUnique({
      where: {
        public_id,
      },
      select: {
        id: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: UserRegisterRequest): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    const foundEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    return foundEmail ? true : false;
  }
}
