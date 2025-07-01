import { hash } from 'bcrypt';
import { checkExistenceById } from '../../utils/DBUtils.js';
import { successResponse } from '../../utils/ResponseHandler.js';
import userService from './user.service.js';

// TODO: while updating records, having unique constraint, make sure to ignore itself while
// checking the unique constraint

async function getAll(_, res, next) {
	try {
		const data = await userService.getAllUsers();
		successResponse(res, data);
	} catch (err) {
		next(err);
	}
}

async function create(req, res, next) {
	try {
		let { name, username, password, email } = req.body;
		password = await hash(password, 10);
		const data = await userService.createUser(name, username, email, password);
		successResponse(res, { id: data.id }, 'User saved successfuly!');
	} catch (err) {
		next(err);
	}
}

async function update(req, res, next) {
	try {
		const { id } = req.params;
		const updateData = req.body;

		const user = await checkExistenceById(id, 'User');
		await userService.updateUser(user, updateData);
		successResponse(res, {}, 'User updated successfully!');
	} catch (err) {
		next(err);
	}
}

async function getHabits(req, res, next) {
	const { id } = req.params;
	try {
		const user = await checkExistenceById(id, 'User');
		const habits = await userService.getUserHabits(user);
		successResponse(res, habits, 'Success', 200);
	} catch (err) {
		next(err);
	}
}

export default { getAll, create, update, getHabits };
