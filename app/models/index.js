import User from '../components/user/user.model.js';
import Habit from '../components/habit/habit.model.js';
import Category from '../components/category/category.model.js';

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
