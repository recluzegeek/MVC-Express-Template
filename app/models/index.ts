/** biome-ignore-all lint/style/noExportedImports: models have been modified
 *  since they were imported, as new associations have been defined on them */

import { Category } from '../components/category/category.model.ts';
import { Habit } from '../components/habit/habit.model.ts';
import { User } from '../components/user/user.model.ts';

User.hasMany(Habit, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Habit.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Category.hasMany(Habit, {
	foreignKey: 'category_id',
	onUpdate: 'CASCADE',
});

Habit.belongsTo(Category, {
	foreignKey: 'category_id',
	onUpdate: 'CASCADE',
});

export { User, Habit, Category };
