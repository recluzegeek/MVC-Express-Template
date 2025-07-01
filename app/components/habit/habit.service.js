import { Category, Habit } from '../../models/index.js';

async function getAllHabits() {
	const habits = await Habit.findAll({
		attributes: { exclude: ['category_id'] },
		include: [{ model: Category, attributes: ['name'] }],
	});
	return habits;
}

async function createHabit(name, description, frequency, status, userId, categoryId) {
	const data = await Habit.create({
		name,
		description,
		status,
		frequency,
		user_id: userId,
		category_id: categoryId,
	});
	return data;
}

async function updateHabit(updateData, id) {
	await Habit.update(updateData, { where: { id } });
}

export default { getAllHabits, createHabit, updateHabit };
