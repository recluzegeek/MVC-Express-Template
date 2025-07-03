import type { Response } from 'express';
import { AppError } from './errors/AppError.ts';
import { SequelizeValidationError } from './errors/DatabaseError.ts';
import { ValidationError } from './errors/ValidationError.ts';
import { logger } from './Logger.ts';

// https://mariusschulz.com/blog/the-unknown-type-in-typescript
// type-safe alternative to 'any' of the typescript
// narrow typing is how we work with 'unknown' type

export const handleError = (err: AppError, res: Response) => {
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
	if (err instanceof SequelizeValidationError) {
		// const errors = err.errors.map((e) => e.message);
		logger.warn(`[SequelizeValidationError] ${JSON.stringify(err.errors)}`);
		return res.status(400).json({
			status: 'failed',
			message: 'Validation failed',
			errors: err.errors,
		});
	}

	// Sequelize unique constraint
	if (err.name === 'SequelizeUniqueConstraintError') {
		// const errors = err.errors.map((e) => e.message);
		logger.warn(`[UniqueConstraintError] ${JSON.stringify(err.errors)}`);
		return res.status(409).json({
			status: 'failed',
			message: 'User already exists.',
			errors: err.errors,
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

	if (err.name === 'SequelizeDatabaseError') {
		logger.warn(`[SequelizeDatabaseError] ${err.message}`);
		return res.status(409).json({
			status: 'failed',
			message: 'Database Error',
		});
	}

	// Custom app errors
	if (err instanceof AppError) {
		logger.error(`[AppError] ${err.name}: ${err.message}`);
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	// if (err.isOperational) {
	// 	logger.error(`Operational Error: ${err}`);
	// 	return res.status(err.statusCode).json({
	// 		status: err.status,
	// 		message: err.message,
	// 	});
	// }

	logger.error(`ERROR: ${err}`);
	return res.status(500).json({
		status: 'error',
		message: 'Something went wrong',
	});
};
