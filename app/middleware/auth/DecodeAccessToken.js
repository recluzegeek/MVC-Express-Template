import pkg from 'jsonwebtoken';
import { ValidationError } from '../../utils/errors/ValidationError.js';

const { verify } = pkg;
export function decodeAccessToken(req, _res, next) {
	let payload = req.accessToken;
	try {
		payload = verify(payload, process.env.ACCESS_TOKEN_SECRET);
		if (!payload?.id) {
			throw new ValidationError(['Invalid token. Please login again.'], 401);
		}
		req.userID = payload.id;
		next();
	} catch (_err) {
		return next(new ValidationError(['Invalid or expired token. Please login again.'], 401));
	}
}
