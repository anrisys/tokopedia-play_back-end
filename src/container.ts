import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { TYPES } from "./types/inversifyTypes";
import { IUserRepository, UserRepository } from "./repositories";
import { IUserService, UserService } from "./services";

const container: Container = new Container();

// Bind PrismaClient as a singleton
container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

// Bind Repository (Interface - Implementation)
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Bind Service (Interface - Implementation)
container.bind<IUserService>(TYPES.IUserRepository).to(UserService);

export { container };
