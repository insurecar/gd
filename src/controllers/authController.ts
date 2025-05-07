import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { AppError, sendTokenResponse, catchAsync } from "../utils";

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
  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect password or email", 401));
    }

    sendTokenResponse(user, 200, res);
  }),
  protect: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  ),
};
