import { Response } from "express";
import { IUserDocument } from "../models/User";
import { createCookieOptions } from "./createCookieOptions";
import { signToken } from "./signToken";

type SendTokenResponseParams = (
  user: IUserDocument,
  statusCode: number,
  res: Response
) => Promise<void>;

export const sendTokenResponse: SendTokenResponseParams = async (
  user,
  statusCode,
  res
) => {
  const token = await signToken(String(user._id));

  const cookieOptions = createCookieOptions();

  res.cookie("__join-token", token, cookieOptions);

  user.password = undefined!;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};
