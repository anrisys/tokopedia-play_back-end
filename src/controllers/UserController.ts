import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversifyTypes";
import { IUserService } from "../services";
import { PublicUserProfile } from "../types";

@injectable()
export class UserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  async listUsers() {}
  /**
 * 
 * @param req 
 * @param res 
 * @param next 
  async showUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): PublicUserProfile {}
 */

  async editProfile() {}
}
