import { Category, Habit, User } from "../../models/index.js";
import { DatabaseError, OwnershipError } from "../../utils/errors/DatabaseError.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { successResponse } from "../../utils/ResponseHandler.js";
import { checkExistenceById } from "../../utils/DBUtils.js";

async function getAll(req, res, next) {
  // fetch all habits for admin
  try {
    const habits = await Habit.findAll({
      attributes: { exclude: ["category_id"] },
      include: [{ model: Category, attributes: ["name"] }],
    });
    successResponse(res, habits);
  } catch (err) {
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Unable to fetch data.", messages, 500));
  }
}

async function create(req, res, next) {
  // create new habit
  try {
    const { name, description, frequency, status, user_id, category_id } = req.body;

    // Early return if record (User) doesn't exist (handled inside the function)
    await checkExistenceById(User, user_id, "User");
    await checkExistenceById(Category, category_id, "Category");

    const data = await Habit.create({ name, description, status, frequency, user_id, category_id });
    successResponse(res, { id: data.id }, "Habit saved successfuly!");
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const { id } = req.params; // id is of habit
  const updateData = req.body; // req.body contains user_id, and category_id

  // Remove fields that are undefined to avoid overwriting with undefined
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  if (Object.keys(updateData).length === 0) {
    throw new ValidationError(err.message || "No valid fields provided for update.", 400);
  }

  // fetch habit by its id and then match its user_id with the provided user_id
  // if they don't match, we throw ownership error

  // Fetch habit to ensure existence
  const habit = await checkExistenceById(Habit, id, "Habit");
  updateData.category_id &&
    (await checkExistenceById(Category, updateData.category_id, "Category"));

  // Ownership check
  if (habit.user_id !== updateData.user_id) {
    throw new OwnershipError("Habit", id);
  }

  await Habit.update(updateData, { where: { id } });

  successResponse(res, {}, "Habit updated successfully!");
}

export default { getAll, create, update };
