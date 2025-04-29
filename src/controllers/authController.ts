import { Response, Request, NextFunction } from "express";
import { catchAsync, sendTokenResponse } from "../utils";
import { User } from "../models/User";

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const signup: Controller = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  sendTokenResponse({ user: newUser, statusCode: 201, res });
});
