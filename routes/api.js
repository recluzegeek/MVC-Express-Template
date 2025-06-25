/* eslint-disable global-require, func-names */

import express from "express";
import validationMiddleware from "../app/middleware/validationMiddleware.js";

import {
  createHabitSchema,
  getHabitSchema,
  updateHabitSchema,
} from "../app/requests/habitRequest.js";
import habitsController from "../app/controllers/Api/habitController.js";

import { createUserSchema, updateUserSchema } from "../app/requests/userRequest.js";
import userController from "../app/controllers/Api/userController.js";

const habitRouter = express.Router();
const userRouter = express.Router();

habitRouter.get("/", habitsController.getAll);
habitRouter.post("/create", validationMiddleware(createHabitSchema), habitsController.create);
habitRouter.put("/update/:id", validationMiddleware(updateHabitSchema), habitsController.update);

userRouter.get("/", userController.getAll);
userRouter.post("/create", validationMiddleware(createUserSchema), userController.create);
userRouter.put("/update/:id", validationMiddleware(updateUserSchema), userController.update);

export default function (app) {
  // Routes prefix
  app.use("/api/habits", habitRouter);
  app.use("/api/users", userRouter);
}
