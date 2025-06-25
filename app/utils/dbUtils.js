import { DatabaseError } from "./errorHandler.js";

export async function checkExistenceById(model, id, next, name = "Record") {
  try {
    const record = await model.findByPk(id);
    if (!record) {
      return next(new DatabaseError(`${name} with ID '${id}' not found`, null, 404));
    }
    return record;
  } catch (err) {
    return next(new DatabaseError(`DB error while fetching ${name}`, [err.message], 500));
  }
}
