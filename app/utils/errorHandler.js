import logger from "./logger.js";

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(errors, statusCode = 400) {
    super("Validation Failed", statusCode);
    this.errors = errors;
    this.name = "ValidationError";
  }
}

export const handleError = (err, res) => {
  if (err instanceof ValidationError) {
    logger.warn("Validation Error", err.errors);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  logger.error("ERROR:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  handleError(err, res);
};
