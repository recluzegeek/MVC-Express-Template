import { ValidationError } from '../../utils/errors/ValidationError.js';

export function requireAuthHeader(req, _res, next) {
	const authorization = req.headers.authorization;
	if (!authorization) {
		throw new ValidationError(['Authorization header or Bearer Token is missing.'], 401);
	}
	// TODO: ensure the token is of format Bearer <token>
	req.accessToken = authorization.split(' ')[1];
	next();
}
