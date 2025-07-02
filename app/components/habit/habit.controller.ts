import type { NextFunction, Request, Response } from 'express';
import { Category, Habit, User } from '../../models/index.js';
import { sanitizePayload } from '../../utils/DataCleansing.js';
import { checkExistenceById } from '../../utils/DBUtils.js';
import { OwnershipError } from '../../utils/errors/DatabaseError.js';
import { successResponse } from '../../utils/ResponseHandler.js';
import type { HabitUpdateDto } from './habit.dto.ts';
import habitService from './habit.service.js';

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
	// fetch all habits for admin
	try {
		const habits: Habit[] = await habitService.getAllHabits();
		successResponse(res, habits);
	} catch (err) {
		next(err);
	}
}

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
	// create new habit
	try {
		const { name, description, frequency, status, userId, categoryId } = req.body;

		// Early return if record (User) doesn't exist (handled inside the function)
		await checkExistenceById(userId, User, 'User');
		await checkExistenceById(categoryId, Category, 'Category');

		const data: Habit = await habitService.createHabit(
			name,
			description,
			frequency,
			status,
			userId,
			categoryId,
		);
		successResponse(res, { id: data.id }, 'Habit saved successfuly!');
	} catch (err) {
		next(err);
	}
}

async function update(req: Request, res: Response): Promise<void> {
	const { id } = req.params; // id is of habit
	const data = req.body; // req.body contains userId, and categoryId
	const updateData: HabitUpdateDto = sanitizePayload(data);

	// fetch habit by its id and then match its userId with the provided userId
	// if they don't match, we throw ownership error

	// Fetch habit to ensure existence
	const habit = await checkExistenceById(id, Habit, 'Habit');
	updateData.categoryId && (await checkExistenceById(updateData.categoryId, Category, 'Category'));

	// Ownership check
	if (habit.userId !== updateData.userId) {
		throw new OwnershipError('Habit', id);
	}
	// TODO: replace with generics and use User component code
	await habitService.updateHabit(updateData, id);

	successResponse(res, {}, 'Habit updated successfully!');
}

// biome-ignore lint/style/noDefaultExport: readability and understanding enhancement
export default { getAll, create, update };
