import type { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils/ErrorHandler.js';
import { AppError } from '../utils/errors/AppError.js';

export const errorMiddleware = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
	const appError = err instanceof AppError ? err : (new Error('Internal Server Error') as AppError);

	appError.statusCode = appError.statusCode || 500;
	appError.status = appError.status || 'error';

	handleError(appError, res);
};
