import { Habit, User } from "../../models/index.js";
import { AppError } from "../../utils/errors/AppError.js";
import { DatabaseError, RecordNotFoundError } from "../../utils/errors/DatabaseError.js";
import { successResponse } from "../../utils/ResponseHandler.js";
import { checkExistenceById } from "../../utils/DBUtils.js";

// TODO: while updating records, having unique constraint, make sure to ignore itself while
// checking the unique constraint

async function getAll(_, res, next) {
  try {
    const data = await User.findAll({ include: Habit });
    successResponse(res, data);
  } catch (err) {
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Unable to fetch data", messages, 400));
  }
}

async function create(req, res, next) {
  //   logger.verbose(`Received request for user creation: ${JSON.stringify(req.body, null, 2)}`);
  try {
    const { name, username, password, email } = req.body;
    const data = await User.create({ name, username, email, password });
    successResponse(res, { id: data.id }, "User saved successfuly!");
  } catch (err) {
    // next(err);
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Unable to save user record", messages, 409));
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that are undefined to avoid overwriting with undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (Object.keys(updateData).length === 0) {
      throw new AppError(err.message || "No valid fields provided for update", 400);
    }

    const [affectedRows] = await User.update(updateData, { where: { id } });
    if (affectedRows === 0) {
      throw new RecordNotFoundError("User", id, 404);
    }
    successResponse(res, {}, "User updated successfully!");
  } catch (err) {
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Failed to update record", messages, 500));
  }
}

async function getHabits(req, res, next) {
  const { id } = req.params;
  try {
    const user = await checkExistenceById(User, id, "User");
    const habits = await user.getHabits();
    successResponse(res, habits, "Success", 200);
  } catch (err) {
    console.log(`${JSON.stringify(err, null, 4)}`);
    next(err);
    // return next(new DatabaseError("Failed to fetch user habits", [err.message], 500));
  }
}

export default { getAll, create, update, getHabits };
