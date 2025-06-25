import User from "./UserModel.js";
import Habit from "./HabitModel.js";
import Category from "./CategoryModel.js";

User.hasMany(Habit, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

Habit.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

Category.hasMany(Habit, {
  foreignKey: "category_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Habit.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export { User, Habit };
