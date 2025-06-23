import logger from "../../utils/logger.js";
import Habit from "../../models/habitModel.js";
import { AppError } from "../../utils/errorHandler.js";

function getAll(req, res, next) {
  // fetch all habits

  Habit.findAll()
    .then((habits) => {
      res.status(200).json(habits);
    })
    .catch((err) => next(new AppError(err.message || "Data fetching unsuccessfull", 500)));
}

function create(req, res, next) {
  // create new habit
  logger.verbose(`Received request for habit creation: ${JSON.stringify(req.body)}`);
  const { name, description, category, frequency, status } = req.body;
  Habit.create({ name, description, category, status, frequency })
    .then(() => res.status(200).send("Habit saved successfuly!"))
    .catch((err) => next(new AppError(err.message || "Failed to create Habit.", 400)));
}

function update(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;

  logger.verbose(
    `Received update request for ID# : ${id} with data: ${JSON.stringify(updateData)}`
  );

  // Remove fields that are undefined to avoid overwriting with undefined
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  if (Object.keys(updateData).length === 0) {
    return next(new AppError(err.message || "No valid fields provided for update", 400));
  }

  Habit.update(updateData, { where: { id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return next(new AppError("Habbit not found.", 404));
      }
      res.json("Habit updated successfully!");
    })
    .catch((err) => next(new AppError(err.message || "Failed to update record", 500)));
}

export default { getAll, create, update };
