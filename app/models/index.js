import User from "./userModel.js";
import Habit from "./habitModel.js";

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
