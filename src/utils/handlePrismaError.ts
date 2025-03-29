import { Prisma } from "@prisma/client";
import { ResponseError } from "../error/ResponseError";

export default function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError
): ResponseError {
  switch (error.code) {
    case "P2002":
      return new ResponseError(
        "database",
        `${error.meta?.target} already exists`,
        409,
        "conflict"
      );
    case "P2025":
      return new ResponseError(
        "database",
        "Record not found",
        404,
        "not_found"
      );
    default:
      return new ResponseError(
        "database",
        "Database operation failed",
        400,
        "database_error"
      );
  }
}
