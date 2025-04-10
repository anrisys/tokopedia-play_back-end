import { inject, injectable } from "inversify";
import { TYPES } from "../../types/inversifyTypes";
import { IAuthRepository, IUserRepository } from "../../repositories";
import { IAuthService } from "../Contracts/IAuthService";
import { LoginRequestData, RegisterRequestInput } from "../../types";
import { uuidv7 } from "uuidv7";
import { AuthenticationError } from "../../error/CustomError";
import { signToken } from "../../utils";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IAuthRepository) private authRepository: IAuthRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async login(
    request: LoginRequestData
  ): Promise<{ userId: string; token: string }> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new AuthenticationError();
    }

    const token = signToken({ userId: user.public_id, role: "user" });

    return { userId: user.public_id, token };
  }

  async register(request: RegisterRequestInput): Promise<void> {
    const public_id = uuidv7();

    await this.authRepository.register({
      email: request.email,
      password: request.password,
      public_id: public_id,
    });
  }
}
