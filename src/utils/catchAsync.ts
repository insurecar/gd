import { Request, Response, NextFunction } from "express";

type AsyncFunc = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const catchAsync = (fn: AsyncFunc) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch((err: any) => {
    console.log(console.log('Error details', err));
    next()
})