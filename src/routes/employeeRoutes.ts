import express from "express";
import { employeesController, authController } from "../controllers";

export const employeeRouter = express.Router();

employeeRouter.get("/", authController.protect, employeesController.getAllUser);
