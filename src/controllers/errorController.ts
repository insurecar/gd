import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils";

// export const globalErrorHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("aksdjakdsjkajsdkajsdkajsdkajsdk", err);

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: "err.status",
//     message: err.message,
//   });
// };

const handleDuplicateFieldsDB = (err: any) => {
  const field = Object.keys(err.keyPattern)[0];
  const value = err.keyValue[field];
  const message = `Duplicate ${field}: "${value}". Please use another one!`;
  return new AppError(message, 400);
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Якщо помилка очікувана (тобто AppError)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Неочікувана помилка: не показуємо деталей користувачу
    console.error("💥 ERROR:", err);

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error: AppError = Object.assign(
      new AppError(err.message, err.statusCode),
      err
    );

    if ((err as any).code === 11000) {
      error = handleDuplicateFieldsDB(err);
    }

    sendErrorProd(error, res);
  }
};
