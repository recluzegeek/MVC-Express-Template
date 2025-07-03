import type { NextFunction, Request, Response } from 'express';
import { User } from '../../models/index.ts';
import { checkExistenceById } from '../../utils/DBUtils.ts';
import { ValidationError } from '../../utils/errors/ValidationError.ts';

// TODO: always ensure this middleware gets called before DecodeAccessToken middleware
export async function attachUser(req: Request, _res: Response, next: NextFunction): Promise<void> {
	if (req.userId) {
		next(new ValidationError(['User ID is missing from request header']));
	}
	try {
		const user: User = await checkExistenceById(req.userId, User, 'User');
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
}
