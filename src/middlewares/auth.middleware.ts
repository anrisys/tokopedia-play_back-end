import { NextFunction, Request, Response } from "express";
import { JwtPayload, verifyToken } from "../utils";
import { AuthenticationError } from "../error/CustomError";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) {
      throw new AuthenticationError("No token provided", "no_token_provided");
    }

    const decoded = verifyToken(accessToken) as JwtPayload;
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
}
