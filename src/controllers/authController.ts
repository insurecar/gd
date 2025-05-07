import { Request, Response, NextFunction } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken";
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
  logout: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.cookie("jwt_token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });
    }
  ),
  protect: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt_token) {
        token = req.cookies.jwt_token;
      }

      if (!token) {
        return next(
          new AppError(
            "You are not logged in. Please, log in to get access",
            401
          )
        );
      }

      const verifyAsync = promisify<string, string, any>(jwt.verify as any);
      let currentUser;
      try {
        const decoded = await verifyAsync(
          token,
          process.env.JWT_SECRET as string
        );
        currentUser = await User.findById(decoded.id);

        if (!currentUser) {
          return next(
            new AppError(
              "The user belonging to this token no longer exist",
              401
            )
          );
        }

        next();
      } catch (err: any) {
        if (err.name === "TokenExpiredError") {
          return next(
            new AppError("Your token has expired! Please log in again.", 401)
          );
        }
        return next(new AppError("Invalid token. Please log in again.", 401));
      }
    }
  ),
};
