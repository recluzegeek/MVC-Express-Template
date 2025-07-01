import pkg from 'jsonwebtoken';
import { ValidationError } from '../../utils/errors/ValidationError.js';

const { verify } = pkg;

export function validateRefreshToken(req, _res, next) {
	const token = req.cookies?.refreshToken;
	if (!token) {
		return next(new ValidationError(['Refresh token not found in cookies. Please sign in again.']));
	}

	// validate refresh token
	try {
		const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
		if (!payload?.id) {
			throw new ValidationError(['Invalid Refresh token.'], 401);
		}
		req.userID = payload.id;
		next();
	} catch (_err) {
		return next(new ValidationError(['Invalid or expired refresh token.'], 401));
	}
}
