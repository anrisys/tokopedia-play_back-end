import { User } from "@prisma/client";
import { CreateUserInput } from "../../types";
import { IUserService } from "../Contracts/IUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types/inversifyTypes";
import { IUserRepository } from "../../repositories";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}
  showUser(public_id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  createUser(data: CreateUserInput): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
