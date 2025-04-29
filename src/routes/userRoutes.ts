import express from "express";
import { signup } from "../controllers";
export const userRouter = express.Router();

userRouter.post("/signup", signup);
