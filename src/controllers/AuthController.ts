import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversifyTypes";
import { IAuthService } from "../services";
import { NextFunction, Request, Response } from "express";
import { RegisterRequestInput } from "../types";
import { APISuccessResponse } from "../utils";

@injectable()
export class AuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirm } = req.body as RegisterRequestInput;

    await this.authService.register({
      email,
      password,
      confirm: confirm,
    });

    const response = new APISuccessResponse(
      "registration_successful",
      "Successful register new user",
      201
    );

    res.status(response.statusCode || 200).json(response.toJSON());
  }
}
