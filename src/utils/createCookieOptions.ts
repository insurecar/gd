import { CookieOptions } from "express";

export const createCookieOptions = (): CookieOptions => {
  if (!process.env.JWT_COOKIE_EXPIRES_IN) {
    throw new Error(
      "JWT_COOKIE_EXPIRES_IN is not defined in environment variables"
    );
  }

  const expiresInDays = Number(process.env.JWT_COOKIE_EXPIRES_IN);
  if (isNaN(expiresInDays)) {
    throw new Error("JWT_COOKIE_EXPIRES_IN must be a valid number");
  }

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV?.toLowerCase() === "production") {
    cookieOptions.secure = true;
  }

  return cookieOptions;
};
