/* eslint-disable global-require, func-names */

import express from "express";
import habitsController from "../app/controllers/Api/habitController.js";

import { createHabitSchema, updateHabitSchema } from "../app/requests/habitRequest.js";
import validationMiddleware from "../app/middleware/validationMiddleware.js";

const router = express.Router();

router.get("/habits", habitsController.getAll);
router.post("/habit/create", validationMiddleware(createHabitSchema), habitsController.create);
router.put("/habit/update/:id", validationMiddleware(updateHabitSchema), habitsController.update); // use id as req.params

export default function (app) {
  // Routes prefix
  app.use("/api", router);
}
