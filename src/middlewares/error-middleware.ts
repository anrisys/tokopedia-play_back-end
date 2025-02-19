import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    console.log("reach error middleware if instance of zodError");
    console.log(error.errors);
    // const validationErrors = error.flatten().fieldErrors;
    const validationErrors =
      error.errors.length === 1
        ? error.errors[0].message
        : error.flatten().fieldErrors;

    res.status(400).json({ errors: validationErrors });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
