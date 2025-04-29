import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/User";
import { sendTokenResponse } from "../utils/sendTokenResponse";
import { Request, Response, NextFunction } from "express";

export const authController = {
  signup: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      sendTokenResponse(newUser, 201, res);
    }
  ),
};
