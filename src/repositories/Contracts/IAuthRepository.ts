import { User } from "@prisma/client";
import { RegisterRequestData } from "../../types";

export interface IAuthRepository {
  register(data: RegisterRequestData): Promise<User>;
}
