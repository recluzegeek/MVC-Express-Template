import logger from "../../utils/Logger.js";
import { Habit, User } from "../../models/index.js";
import { DatabaseError } from "../../utils/errors/DatabaseError.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { successResponse } from "../../utils/ResponseHandler.js";
import { checkExistenceById } from "../../utils/DBUtils.js";

// TODO: Central error handling for db related operations, so no need to write classess for each
// of the type
async function getAll(req, res, next) {
  // fetch all habits for admin
  try {
    const habits = await Habit.findAll();
    successResponse(res, habits);
  } catch (err) {
    console.log(`${JSON.stringify(err, null, 4)}`);
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Unable to fetch data.", messages, 500));
  }
}

// TODO: handle SequelizeForeignKeyConstraintError, right now we're trusting the user input,
// but we need to ensure the passed id is a valid id
async function create(req, res, next) {
  // create new habit
  logger.verbose(`Received request for habit creation: ${JSON.stringify(req.body, null, 2)}`);
  try {
    const { name, description, category, frequency, status, user_id } = req.body;
    // checkExistenceById(User, user_id, next);

    const data = await Habit.create({ name, description, category, status, frequency, user_id });
    successResponse(res, { id: data.id }, "Habit saved successfuly!");
  } catch (err) {
    console.log(JSON.stringify(err, null, 4));

    const messages = err.errors.map((e) => e.message);
    next(new DatabaseError("Failed to create Habit.", messages, 400));
  }
}

async function update(req, res, next) {
  logger.verbose(
    `Received update request for ID# : ${id} with data: ${JSON.stringify(updateData, null, 2)}`
  );
  // TODO: ensure the habit belongs to the user before updating it
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that are undefined to avoid overwriting with undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (Object.keys(updateData).length === 0) {
      return next(new ValidationError(err.message || "No valid fields provided for update", 400));
    }

    const [affectedRows, _] = await Habit.update(updateData, { where: { id } });

    if (affectedRows === 0) {
      return next(new DatabaseError("Habit not found.", {}, 404));
    }
    successResponse(res, {}, "Habit updated successfully!");
  } catch (err) {
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Failed to update record", messages, 500));
  }
}

export default { getAll, create, update };
