import type { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils/ErrorHandler.ts';
import type { AppError } from '../utils/errors/AppError.ts';
// TODO: must find a better way than this.
export const errorMiddleware = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	handleError(err, res);
};
