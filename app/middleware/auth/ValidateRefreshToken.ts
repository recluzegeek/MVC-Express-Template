import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { verifyToken } from '../../utils/JWTTokens.ts';

export function validateRefreshToken(req: Request, _res: Response, next: NextFunction): void {
	const token = req.cookies?.refreshToken;
	if (!token) {
		next(new ValidationError(['Refresh token not found in cookies. Please sign in again.']));
	}

	// validate refresh token
	try {
		const payload = verifyToken(token, process.env.REFRESH_TOKEN_SECRET, 'Invalid Refresh token.');
		req.userId = payload.id;
		next();
	} catch (_err) {
		next(new ValidationError(['Invalid or expired refresh token.'], 401));
	}
}
