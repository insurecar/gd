import { catchAsync } from "../utils";
import { Request, Response, NextFunction } from "express";
import { Employee } from "../models";

export const employeesController = {
  getAllUser: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const employees = await Employee.find();
      res.status(200).json({
        status: "success",
        length: employees.length,
        data: { employees },
      });
    }
  ),
};
