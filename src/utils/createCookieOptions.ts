import { CookieOptions } from "express";

export const createCookieOptions = (): CookieOptions => {
    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error('JWT_EXPIRES_IN is not defined in environment variables');
    }

    const cookieOptions: CookieOptions = {
        expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    return cookieOptions;
};