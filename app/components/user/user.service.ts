import { Category, Habit, User } from '../../models/index.js';
import { sanitizePayload } from '../../utils/DataCleansing.js';
import type { UserUpdateDto } from './user.dto.ts';

// TODO: replace sequelize methods with magic methods where ever possible

async function getAllUsers(): Promise<User[]> {
	const data: User[] = await User.findAll({
		attributes: { exclude: [] },
		include: {
			model: Habit,
			attributes: {
				exclude: ['id', 'user_id', 'category_id'],
			},
		},
	});
	return data;
}

async function getUserHabits(user: User) {
	const habits = await user.getHabits({
		attributes: { exclude: ['id', 'user_id'] },
		include: {
			model: Category,
			attributes: {
				include: ['name', 'description'],
				exclude: ['id'],
			},
		},
	});
	return habits;
}

async function createUser(name: string, username: string, password: string, email: string) {
	const data = await User.create({ name, username, email, password });
	return data;
}

async function updateUser(user: User, updateData: UserUpdateDto) {
	const data = sanitizePayload(updateData);

	await user.update(data);
	await user.save();
}

// biome-ignore lint/style/noDefaultExport: more readable
export default { getAllUsers, createUser, updateUser, getUserHabits };
