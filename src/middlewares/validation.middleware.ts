import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { Validation } from "../validations/validation";

type ValidationSchemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = Validation.validate(schemas.body, req.body);
      }
      if (schemas.params) {
        req.params = Validation.validate(schemas.params, req.params);
      }
      if (schemas.query) {
        req.query = Validation.validate(schemas.query, req.query);
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}
