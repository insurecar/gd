import express from "express";
import { employeesController } from "../controllers";

export const employeeRouter = express.Router();

employeeRouter.get("/", employeesController.getAllUser);
