import express, { Request, Response } from "express";
import { globalErrorHandler } from "./controllers/errorController";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: 'success'
  })
});


app.use(globalErrorHandler)