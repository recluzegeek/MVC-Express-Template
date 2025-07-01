import { handleError } from '../utils/ErrorHandler.js';

export const errorMiddleware = (err, _req, res, _next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	handleError(err, res);
};
