import { Prisma, PrismaClient, Role, User } from "@prisma/client";
import { IUserRepository } from "../Contracts/IUserRepository";
import { UserRegisterRequest } from "../../types";
import { injectable } from "inversify";
import { UserUpdateRequest } from "../../types/user";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async listUsers(
    filters?: { role?: Role; search?: string },
    pagination?: { page: number; perPage: number }
  ): Promise<{ users: User[]; total: number }> {
    const whereClause: Prisma.UserWhereInput = {};

    if (filters?.role) whereClause.role = filters.role;
    if (filters?.search) {
      whereClause.OR = [{ email: { contains: filters.search } }];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip: pagination
          ? (pagination.page - 1) * pagination.perPage
          : undefined,
        take: pagination?.perPage,
        orderBy: { created_at: "desc" },
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return { users, total };
  }
  async deleteUser(userId: number): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userId: number, data: UserUpdateRequest): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });
  }

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
