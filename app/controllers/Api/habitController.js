import logger from "../../utils/logger.js";
import Habit from "../../models/habitModel.js";
import { DatabaseError, ValidationError } from "../../utils/errorHandler.js";
import { successResponse } from "../../utils/responseHandler.js";

function getAll(req, res, next) {
  // fetch all habits

  Habit.findAll()
    .then((habits) => successResponse(res, habits))
    .catch((err) => {
      const messages = err.errors.map((e) => e.message);
      return next(new DatabaseError("Unable to fetch data.", messages, 500));
    });
}

function create(req, res, next) {
  // create new habit
  logger.verbose(`Received request for habit creation: ${JSON.stringify(req.body, null, 2)}`);
  const { name, description, category, frequency, status } = req.body;
  Habit.create({ name, description, category, status, frequency })
    .then((data) => successResponse(res, { id: data.id }, "Habit saved successfuly!"))
    .catch((err) => {
      const messages = err.errors.map((e) => e.message);
      next(new DatabaseError("Failed to create Habit.", messages, 400));
    });
}

function update(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;

  logger.verbose(
    `Received update request for ID# : ${id} with data: ${JSON.stringify(updateData, null, 2)}`
  );

  // Remove fields that are undefined to avoid overwriting with undefined
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  if (Object.keys(updateData).length === 0) {
    return next(new ValidationError(err.message || "No valid fields provided for update", 400));
  }

  Habit.update(updateData, { where: { id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return next(new DatabaseError("Habit not found.", {}, 404));
      }
      successResponse(res, {}, "Habit updated successfully!");
    })
    .catch((err) => {
      const messages = err.errors.map((e) => e.message);
      return next(new DatabaseError("Failed to update record", messages, 500));
    });
}

export default { getAll, create, update };
