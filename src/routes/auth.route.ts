import { Router } from "express";
import { container } from "../container";
import { AuthController } from "../controllers";
import { TYPES } from "../types/inversifyTypes";
import { validate } from "../middlewares/validation.middleware";
import { AuthValidation } from "../validations/AuthValidation";

const router = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

router.post(
  "/register",
  validate({ body: AuthValidation.REGISTER }),
  authController.register
);
router.post(
  "/login",
  validate({ body: AuthValidation.LOGIN }),
  authController.login
);

export { router as authRoutes };
