import User from "./UserModel.js";
import Habit from "./HabitModel.js";

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

export { User, Habit };
