import express from "express";
import { signup } from "../controllers";
import { catchAsync } from "../utils";
export const userRouter = express.Router();

userRouter.post("/signup", catchAsync(signup));
