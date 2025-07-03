import type { NextFunction, Request, Response } from 'express';
import { User } from '../../models/index.ts';
import { checkExistenceById } from '../../utils/DBUtils.ts';
import { successResponse } from '../../utils/ResponseHandler.ts';
import type { UserUpdateDto } from './user.dto.ts';
import userService from './user.service.ts';

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
		const updateData: UserUpdateDto = req.body;

		const user: User = await checkExistenceById(id, User, 'User');
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
