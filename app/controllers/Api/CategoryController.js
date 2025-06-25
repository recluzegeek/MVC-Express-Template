import {
  DatabaseError,
  RecordNotFoundError,
  OwnershipError,
} from "../../utils/errors/DatabaseError.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { successResponse } from "../../utils/ResponseHandler.js";
import { checkExistenceById } from "../../utils/DBUtils.js";
import Category from "../../models/CategoryModel.js";

async function getAll(req, res, next) {
  // fetch all categories for admin
  try {
    const categories = await Category.findAll();
    successResponse(res, categories);
  } catch (err) {
    const messages = err.errors.map((e) => e.message);
    return next(new DatabaseError("Unable to fetch data.", messages, 500));
  }
}

async function create(req, res) {
  // create new category
  try {
    const { name, description } = req.body;

    const data = await Category.create({ name, description });
    successResponse(res, { id: data.id }, "Category saved successfuly!");
  } catch (err) {
    next(err);
  }
}

export default { getAll, create };
