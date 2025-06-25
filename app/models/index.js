import User from "./UserModel.js";
import Habit from "./HabitModel.js";
import Category from "./CategoryModel.js";

User.hasMany(Habit, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Habit.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Category.hasMany(Habit, {
  foreignKey: "category_id",
  onUpdate: "CASCADE",
});

Habit.belongsTo(Category, {
  foreignKey: "category_id",
  onUpdate: "CASCADE",
});

export { User, Habit, Category };
