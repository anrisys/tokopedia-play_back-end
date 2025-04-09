import { inject, injectable } from "inversify";
import { TYPES } from "../../types/inversifyTypes";
import { IAuthRepository } from "../../repositories";
import { IAuthService } from "../Contracts/IAuthService";
import { User } from "@prisma/client";
import { RegisterRequestInput } from "../../types";
import { uuidv7 } from "uuidv7";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IAuthRepository) private authRepository: IAuthRepository
  ) {}

  async register(request: RegisterRequestInput): Promise<void> {
    const public_id = uuidv7();

    await this.authRepository.register({
      email: request.email,
      password: request.password,
      public_id: public_id,
    });
  }
}
