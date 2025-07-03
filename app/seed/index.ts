import { hash } from 'bcrypt';
import { sequelize } from '../../config/db.ts';
import { Category, Habit, User } from '../models/index.ts';

const hashedPassword = await Promise.all([hash('Password123!', 10), hash('Password123!', 10)]);

const seed = async (): Promise<void> => {
	const categoryEnum = ['Health', 'Tech', 'Social', 'Knowledge', 'Hobby', 'House Chores'];
	try {
		await sequelize.sync({ force: true });

		const categories = await Category.bulkCreate(
			categoryEnum.map((name) => ({
				name,
			})),
		);

		// Seed users
		const users = await User.bulkCreate([
			{
				name: 'Alice Johnson',
				username: 'alicej',
				email: 'alice@example.com',
				password: hashedPassword[0],
			},
			{
				name: 'Bob Smith',
				username: 'bobsmith',
				email: 'bob@example.com',
				password: hashedPassword[1],
			},
		]);

		// Seed habits
		await Habit.bulkCreate([
			{
				name: 'Read a book',
				description: 'Read at least 10 pages daily.',
				status: 'Pending',
				frequency: 'Daily',
				userId: users[0].id,
				categoryId: categories[4].id,
			},
			{
				name: 'Workout',
				description: 'Go to gym 3 times a week.',
				status: 'In Progress',
				frequency: 'Weekly',
				userId: users[1].id,
				categoryId: categories[0].id,
			},
		]);

		process.exit(0);
	} catch (_error) {
		process.exit(1);
	}
};

seed();
