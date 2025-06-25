import { AppError } from "./AppError.js";

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed", errors = [], statusCode = 500) {
    super(message, statusCode);
    this.name = "DatabaseError";
    this.errors = errors;
  }
}

export class ForeignKeyConstraintError extends DatabaseError {
  constructor(message = "Foreign key constraint failed", errors = [], statusCode = 409) {
    super(message, errors, statusCode);
    this.name = "ForeignKeyConstraintError";
  }
}

export class UniqueConstraintError extends DatabaseError {
  constructor(message = "Unique constraint failed", errors = [], statusCode = 409) {
    super(message, errors, statusCode);
    this.name = "UniqueConstraintError";
  }
}

export class RecordNotFoundError extends DatabaseError {
  constructor(modelName = "Record", id = "", statusCode = 404) {
    super("Record Not Found", [`${modelName} with ID ${id} not found`], statusCode);
    this.name = "RecordNotFoundError";
  }
}

export class SequelizeValidationError extends DatabaseError {
  constructor(message = "Validation error", errors = [], statusCode = 400) {
    super(message, errors, statusCode);
    this.name = "SequelizeValidationError";
  }
}

export class OwnershipError extends AppError {
  constructor(entity = "Record", id, statusCode = 403) {
    super(`${entity} with ID '${id}' does not belong to the current user.`, statusCode);
    this.name = "OwnershipError";
    this.status = "unauthorized";
    this.id = id;
  }
}
