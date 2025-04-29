import { Response } from "express"
import { IUserDocument } from '../models/User'
import { createCookieOptions } from './createCookieOptions'
import { signToken } from './signToken'


interface SendTokenResponseParams {
    user: IUserDocument,
    statusCode: number,
    res: Response
}

export const sendTokenResponse = ({ user, statusCode, res }: SendTokenResponseParams): void => {
    const token = signToken(String(user._id));

    const cookieOptions = createCookieOptions();

    res.cookie('__join-token', token, cookieOptions);

    user.password = undefined!;

    res.status(statusCode).json({
        status: "success",
        token,
        data: { user },
    });
};