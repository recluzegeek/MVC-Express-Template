import { Category, Habit } from '../../models/index.js';
import sanitizePayload from '../../utils/DataCleansing.js';
import { checkExistenceById } from '../../utils/DBUtils.js';
import { OwnershipError } from '../../utils/errors/DatabaseError.js';
import { successResponse } from '../../utils/ResponseHandler.js';
import habitService from './habit.service.js';

async function getAll(_req, res, next) {
	// fetch all habits for admin
	try {
		const habits = await habitService.getAllHabits();
		successResponse(res, habits);
	} catch (err) {
		next(err);
	}
}

async function create(req, res, next) {
	// create new habit
	try {
		const { name, description, frequency, status, user_id, category_id } = req.body;

		// Early return if record (User) doesn't exist (handled inside the function)
		await checkExistenceById(user_id, 'User');
		await checkExistenceById(category_id, 'Category', Category);

		const data = await habitService.createHabit(
			name,
			description,
			frequency,
			status,
			user_id,
			category_id,
		);
		successResponse(res, { id: data.id }, 'Habit saved successfuly!');
	} catch (err) {
		next(err);
	}
}

async function update(req, res) {
	const { id } = req.params; // id is of habit
	const data = req.body; // req.body contains user_id, and category_id

	const updateData = sanitizePayload(data);

	// fetch habit by its id and then match its user_id with the provided user_id
	// if they don't match, we throw ownership error

	// Fetch habit to ensure existence
	const habit = await checkExistenceById(id, 'Habit', Habit);
	updateData.category_id &&
		(await checkExistenceById(updateData.category_id, 'Category', Category));

	// Ownership check
	if (habit.user_id !== updateData.user_id) {
		throw new OwnershipError('Habit', id);
	}

	await habitService.updateHabit(updateData, id);

	successResponse(res, {}, 'Habit updated successfully!');
}

export default { getAll, create, update };
