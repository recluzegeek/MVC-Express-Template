import { AppError } from './errors/AppError.js';
import { ValidationError } from './errors/ValidationError.js';
import logger from './Logger.js';

export const handleError = (err, res) => {
	// JOI Validation errors
	if (err instanceof ValidationError) {
		logger.warn(`Validation Error:  ${JSON.stringify(err.errors, null, 2)}`);
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			errors: err.errors,
		});
	}

	// Sequelize validation
	if (err.name === 'SequelizeValidationError') {
		const errors = err.errors.map((e) => e.message);
		logger.warn(`[SequelizeValidationError] ${JSON.stringify(errors)}`);
		return res.status(400).json({
			status: 'failed',
			message: 'Validation failed',
			errors,
		});
	}

	// Sequelize unique constraint
	if (err.name === 'SequelizeUniqueConstraintError') {
		const errors = err.errors.map((e) => e.message);
		logger.warn(`[UniqueConstraintError] ${JSON.stringify(errors)}`);
		return res.status(409).json({
			status: 'failed',
			message: 'User already exists.',
			errors,
		});
	}

	// Foreign key constraint
	if (err.name === 'SequelizeForeignKeyConstraintError') {
		logger.warn(`[ForeignKeyConstraintError] ${err.message}`);
		return res.status(409).json({
			status: 'failed',
			message: 'Foreign key constraint failed',
		});
	}

	// Custom app/db errors
	if (err instanceof AppError) {
		logger.error(`[AppError] ${err.name}: ${err.message} - ${err.errors}`);
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			...(err.errors ? { errors: err.errors } : {}),
		});
	}

	if (err.isOperational) {
		logger.error(`Operational Error: ${err}`);
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	logger.error(`ERROR: ${err}`);
	return res.status(500).json({
		status: 'error',
		message: 'Something went wrong',
	});
};
