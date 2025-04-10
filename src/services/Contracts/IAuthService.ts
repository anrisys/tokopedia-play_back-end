import { User } from "@prisma/client";
import { LoginRequestData, RegisterRequestInput } from "../../types";

export interface IAuthService {
  register(request: RegisterRequestInput): Promise<void>;
  login(request: LoginRequestData): Promise<{ userId: string; token: string }>;
}
