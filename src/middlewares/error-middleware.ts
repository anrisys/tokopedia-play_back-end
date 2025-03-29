import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/ResponseError";
import { ValidationError } from "../error/CustomError";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../utils";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Handle know error types
  if (error instanceof ResponseError) {
    return res.status(error.statusCode).json(error.toJSON());
  }

  // Zod Validation Errors
  if (error instanceof ZodError) {
    const details = error.errors.reduce<Record<string, string[]>>(
      (acc, err) => {
        const field = err.path.join(".");
        acc[field] = acc[field] || [];
        acc[field].push(err.message);
        return acc;
      },
      {}
    );

    return res.status(400).json(
      new ValidationError(
        "Validation failed",
        details,
        "invalid_input" // Custom code
      ).toJSON()
    );
  }

  // Prisma Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error); // Extract to a helper function
    return res.status(prismaError.statusCode).json(prismaError.toJSON());
  }

  // Database Connection Errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return res
      .status(503)
      .json(
        new ResponseError(
          "database",
          "Database connection failed",
          503,
          "database_unavailable"
        ).toJSON()
      );
  }

  // Fallback: Unexpected Errors
  res
    .status(500)
    .json(
      new ResponseError(
        "internal",
        "An unexpected error occurred",
        500,
        "server_error"
      ).toJSON()
    );
}
