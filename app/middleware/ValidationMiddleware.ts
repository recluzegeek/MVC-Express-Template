// Run JOI validations before the request hits
// the controller. If it passes, continue to controller,
// else respond back with error message's

import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ObjectSchema } from 'joi';
import { ValidationError } from '../utils/errors/ValidationError.ts';

const validationMiddleware = (schema: ObjectSchema): RequestHandler => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
		if (error) {
			// Send all validation errors back
			const errors = error.details.map((detail) => detail.message);
			// console.log(`[ValidationMiddleware] - ${JSON.stringify(errors, null, 4)}`);
			next(new ValidationError(errors, 400));
		}
		next(); // validation passed, continue to controller
	};
};

export { validationMiddleware };
