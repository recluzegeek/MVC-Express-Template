import { Category, Habit, User } from '../../models/index.js';
import sanitizePayload from '../../utils/DataCleansing.js';

async function getAllUsers() {
	const data = await User.findAll({
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

async function getUserHabits(user) {
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

async function createUser(name, username, password, email) {
	const data = await User.create({ name, username, email, password });
	return data;
}

async function updateUser(user, updateData) {
	const data = sanitizePayload(updateData);

	await user.update(data);
	await user.save();
}

export default { getAllUsers, createUser, updateUser, getUserHabits };
