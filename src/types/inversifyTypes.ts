const TYPES = {
  IAuthRepository: Symbol.for("IAuthRepository"),
  IAuthService: Symbol.for("IAuthService"),
  AuthController: Symbol.for("AuthController"),
  IUserRepository: Symbol.for("IUserRepository"),
  IUserService: Symbol.for("IUserService"),
  PrismaClient: Symbol.for("PrismaClient"),
};

export { TYPES };
