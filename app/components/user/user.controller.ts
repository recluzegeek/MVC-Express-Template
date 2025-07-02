import type { NextFunction, Request, Response } from 'express';
import type { User } from '../../models/index.js';
import { checkExistenceById } from '../../utils/DBUtils.js';
import { successResponse } from '../../utils/ResponseHandler.js';
import userService from './user.service.js';

// TODO: while updating records, having unique constraint, make sure to ignore itself while
// checking the unique constraint

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const data: User[] = await userService.getAllUsers();
		successResponse(res, data);
	} catch (err) {
		next(err);
	}
}

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { name, username, password, email } = req.body;
		const data: User = await userService.createUser(name, username, email, password);
		successResponse(res, { id: data.id }, 'User saved successfuly!');
	} catch (err) {
		next(err);
	}
}

async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { id } = req.params;
		const updateData = req.body;

		const user: User = await checkExistenceById(id, 'User');
		await userService.updateUser(user, updateData);
		successResponse(res, {}, 'User updated successfully!');
	} catch (err) {
		next(err);
	}
}

// async function getHabits(req: Request, res: Response, next: NextFunction): Promise<void> {
// 	const { id } = req.params;
// 	try {
// 		const user = await checkExistenceById(id, 'User');
// 		const habits = await userService.getUserHabits(user);
// 		successResponse(res, habits, 'Success', 200);
// 	} catch (err) {
// 		next(err);
// 	}
// }

// biome-ignore lint/style/noDefaultExport: increases readability to use something like userController.get()
export default { getAll, create, update };
