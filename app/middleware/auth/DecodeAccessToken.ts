import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { verifyToken } from '../../utils/JWTTokens.ts';

export function decodeAccessToken(req: Request, _res: Response, next: NextFunction): void {
	try {
		const payload = verifyToken(
			req.accessToken,
			process.env.ACCESS_TOKEN_SECRET,
			'Invalid token. Please login again.',
		);
		req.userId = payload.id;
		next();
	} catch (_err) {
		next(new ValidationError(['Invalid or expired token. Please login again.'], 401));
	}
}
