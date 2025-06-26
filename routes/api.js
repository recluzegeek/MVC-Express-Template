/* eslint-disable global-require, func-names */

import express from "express";
import validationMiddleware from "../app/middleware/ValidationMiddleware.js";

import {
  createHabitSchema,
  getHabitSchema,
  updateHabitSchema,
} from "../app/requests/HabitRequest.js";
import habitsController from "../app/controllers/Api/HabitController.js";

import { createUserSchema, updateUserSchema } from "../app/requests/UserRequest.js";
import userController from "../app/controllers/Api/UserController.js";

import { createCategorySchema } from "../app/requests/CategoryRequest.js";
import categoryController from "../app/controllers/Api/CategoryController.js";

const habitRouter = express.Router();
const categoryRouter = express.Router();
const userRouter = express.Router();

habitRouter.get("/", habitsController.getAll);
habitRouter.post("/create", validationMiddleware(createHabitSchema), habitsController.create);
habitRouter.put("/update/:id", validationMiddleware(updateHabitSchema), habitsController.update);

categoryRouter.get("/", categoryController.getAll);
categoryRouter.post(
  "/create",
  validationMiddleware(createCategorySchema),
  categoryController.create
);

userRouter.get("/", userController.getAll);
userRouter.get("/habits/:id", userController.getHabits);
userRouter.post("/signup", validationMiddleware(createUserSchema), userController.create);
userRouter.put("/update/:id", validationMiddleware(updateUserSchema), userController.update);

export default function (app) {
  // Routes prefix
  app.use("/api", userRouter);
  app.use("/api/habits", habitRouter);
  app.use("/api/categories", categoryRouter);
}
