import logger from "../../utils/logger.js";
import User from "../../models/userModel.js";
import { AppError, DatabaseError } from "../../utils/errorHandler.js";

// TODO: update(), getAllPosts(),

function getAll(_, res, next) {
  User.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(JSON.stringify(err, null, 4));
      return next(new DatabaseError("Unable to fetch data", err, 400));
    });
}

function create(req, res, next) {
  logger.verbose(`Received request for user creation: ${JSON.stringify(req.body, null, 2)}`);
  const { name, username, password, email } = req.body;
  User.create({ name, username, email, password })
    .then(() => res.status(200).send("User saved successfuly!"))
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
        return next(new AppError("User not found.", 404));
      }
      res.json("User updated successfully!");
    })
    .catch((err) => next(new AppError(err.message || "Failed to update record", 500)));
}

export default { getAll, create, update };
