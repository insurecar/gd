import express, { Request, Response } from "express";
import { globalErrorHandler } from "./controllers";
import { userRouter, employeeRouter } from "./routes";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "success",
  });
});

app.use("/api/v2/users", userRouter);

app.use("/api/v2/employees", employeeRouter);

app.use(globalErrorHandler);
