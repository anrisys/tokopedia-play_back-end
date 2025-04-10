import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversifyTypes";
import { IAuthService } from "../services";
import { NextFunction, Request, Response } from "express";
import {
  LoginRequestData,
  LoginResponseData,
  RegisterRequestInput,
} from "../types";
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

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as LoginRequestData;

    const result = await this.authService.login({ email, password });

    const response = new APISuccessResponse<LoginResponseData>(
      "login_successful",
      "Successful login",
      200,
      result
    );

    res.status(response.statusCode || 200).json(response.toJSON());
  }
}
