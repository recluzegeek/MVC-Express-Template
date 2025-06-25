import { RecordNotFoundError } from "./errors/DatabaseError.js";

export async function checkExistenceById(model, id, name = "Record") {
  const record = await model.findByPk(id);
  if (!record) {
    throw new RecordNotFoundError(name, id, 404);
  }
  return record;
}
