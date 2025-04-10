import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/CustomError";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret";

export interface JwtPayload {
  userId: string;
  role?: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (e: any) {
    if (e.name === "TokenExpiredError") {
      throw new AuthenticationError("Token Expired", "token_expired");
    }
    if (e.name === "JsonWebTokenError") {
      throw new AuthenticationError("Invalid token", "invalid_token");
    }
    throw new AuthenticationError(
      "Token verification failed",
      "token_verification_failed"
    );
  }
}
