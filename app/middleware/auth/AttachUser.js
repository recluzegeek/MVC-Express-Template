import { checkExistenceById } from '../../utils/DBUtils.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export async function attachUser(req, _res, next) {
	if (req.userID) {
		next(new ValidationError(['User ID is missing from request header']));
	}
	try {
		const user = await checkExistenceById(req.userID, 'User');
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
}
