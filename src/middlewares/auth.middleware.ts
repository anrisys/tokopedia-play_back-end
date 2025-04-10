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
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("No token provided", "no_token_provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
}
