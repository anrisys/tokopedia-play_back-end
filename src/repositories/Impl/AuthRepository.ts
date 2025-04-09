import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { RegisterRequestData } from "../../types";
import { IAuthRepository } from "../Contracts/IAuthRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types/inversifyTypes";
import { IUserRepository } from "../Contracts/IUserRepository";
import { BusinessLogicError } from "../../error/CustomError";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async register(data: RegisterRequestData): Promise<User> {
    const isEmailAlreadyRegistered =
      await this.userRepository.isEmailAlreadyRegistered(data.email);

    if (isEmailAlreadyRegistered)
      throw new BusinessLogicError("Email is already registered");

    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(process.env.SALT_ROUNDS)
    );

    return await this.userRepository.createUser({
      public_id: data.public_id,
      email: data.email,
      password: hashedPassword,
    });
  }
}
