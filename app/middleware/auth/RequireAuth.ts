import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/errors/ValidationError.ts';

export function requireAuthHeader(req: Request, _res: Response, next: NextFunction): void {
	const authorization = req.headers.authorization;
	if (!authorization) {
		throw new ValidationError(['Authorization header or Bearer Token is missing.'], 401);
	}
	// expected token format: Bearer es32169329-some-long-gibberish-token
	req.accessToken = authorization.split(' ')[1];
	next();
}
