import { Category, Habit } from '../../models/index.ts';
import type { HabitUpdateDto } from './habit.dto.ts';

async function getAllHabits(): Promise<Habit[]> {
	const habits: Habit[] = await Habit.findAll({
		attributes: { exclude: ['category_id'] },
		include: [{ model: Category, attributes: ['name'] }],
	});
	return habits;
}

async function createHabit(
	name: string,
	description: string,
	frequency: string,
	status: string,
	userId: string,
	categoryId: string,
): Promise<Habit> {
	const data: Habit = await Habit.create({
		name,
		description,
		status,
		frequency,
		userId: userId,
		categoryId: categoryId,
	});
	return data;
}

async function updateHabit(updateData, id: string) {
	await Habit.update(updateData, { where: { id } });
}

// biome-ignore lint/style/noDefaultExport: increase readblity and understanding
export default { getAllHabits, createHabit, updateHabit };
