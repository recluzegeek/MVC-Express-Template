// Joi or request validation errors
import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(errors, statusCode = 400) {
    super("Validation Failed", statusCode);
    this.errors = errors;
    this.name = "ValidationError";
  }
}
