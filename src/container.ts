import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { TYPES } from "./types/inversifyTypes";
import {
  AuthRepository,
  IAuthRepository,
  IUserRepository,
  UserRepository,
} from "./repositories";
import {
  AuthService,
  IAuthService,
  IUserService,
  UserService,
} from "./services";
import { AuthController } from "./controllers";

const container: Container = new Container();

// Bind PrismaClient as a singleton
container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

// Bind Repository (Interface - Implementation)
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Bind Service (Interface - Implementation)
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

// Inserting the controller into DI
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };
