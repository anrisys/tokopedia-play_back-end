import { User } from "@prisma/client";
import { RegisterRequestInput } from "../../types";

export interface IAuthService {
  register(request: RegisterRequestInput): Promise<void>;
}
