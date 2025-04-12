import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middlewares/error-middleware";

dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(publicRouter);
  app.use(errorMiddleware);

  return app;
};

export const startServer = (app: Application) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Only start the server if this file is executed directly
if (require.main === module) {
  const app = createApp();
  startServer(app);
}
