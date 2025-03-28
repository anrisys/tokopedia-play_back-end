import { User } from "@prisma/client";
import { CreateUserInput } from "../../types";

export interface IUserService {
  createUser(data: CreateUserInput): Promise<User>;
  showUser(public_id: string): Promise<User | null>;
}
