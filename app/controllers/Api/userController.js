import logger from "../../utils/logger.js";
import User from "../../models/userModel.js";
import { AppError, DatabaseError } from "../../utils/errorHandler.js";
import { successResponse } from "../../utils/responseHandler.js";

// TODO: update(), getAllPosts(),

function getAll(_, res, next) {
  User.findAll()
    .then((data) => successResponse(res, data))
    .catch((err) => {
      //   console.log(JSON.stringify(err, null, 4));
      const messages = err.errors.map((e) => e.message);
      return next(new DatabaseError("Unable to fetch data", messages, 400));
    });
}

function create(req, res, next) {
  //   logger.verbose(`Received request for user creation: ${JSON.stringify(req.body, null, 2)}`);
  const { name, username, password, email } = req.body;
  User.create({ name, username, email, password })
    .then((data) => successResponse(res, { id: data.id }, "User saved successfuly!"))
    .catch((err) => {
      //   console.log(JSON.stringify(err, null, 4));
      const messages = err.errors.map((e) => e.message);
      //   console.log(JSON.stringify(messages, null, 4));
      return next(new DatabaseError("Unable to save user record", messages, 409));
    });
}

function update(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;

  // Remove fields that are undefined to avoid overwriting with undefined
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  if (Object.keys(updateData).length === 0) {
    return next(new AppError(err.message || "No valid fields provided for update", 400));
  }

  User.update(updateData, { where: { id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return next(new DatabaseError("User not found.", {}, 404));
      }
      successResponse(res, {}, "User updated successfully!");
    })
    .catch((err) => {
      const messages = err.errors.map((e) => e.message);
      return next(new DatabaseError("Failed to update record", messages, 500));
    });
}

export default { getAll, create, update };
