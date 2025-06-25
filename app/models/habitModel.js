import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import User from "./UserModel.js";

// sequelize or any ORM enforces validation at model level, not at application level
// (before request hit the db). We  need to use a dedicated validator like joi,
//  or express-validator for this purpose

// Bar.belongsTo(Foo) // one-to-one relation: with foreign key stored in Bar (source)
// Habit.belongsTo(User)  // one-to-one relation: with foreign key stored in Habit (user_id - foreign key)

const categoryEnum = ["Health", "Tech", "Social", "Knowledge", "Hobby", "House Chores"];
const frequencyEnum = ["Daily", "Weekly", "Monthly", "BiWeekly"];
const statusEnum = ["Pending", "In Progress", "Done"];

const Habit = sequelize.define(
  "Habit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name must not be empty" },
        len: {
          args: [2, 200],
          msg: "Name must be between 2 and 200 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 500],
          msg: "Description must be between 10 and 500 characters",
        },
      },
    },
    category: {
      type: DataTypes.ENUM(categoryEnum),
      allowNull: true,
      validate: {
        isIn: {
          args: [categoryEnum],
          msg: `Frequency must be one of: ${[...categoryEnum]}`,
        },
      },
    },
    status: {
      type: DataTypes.ENUM(statusEnum),
      defaultValue: "Pending",
      validate: {
        isIn: {
          args: [statusEnum],
          msg: `Status must be one of: ${[...statusEnum]}`,
        },
      },
    },
    frequency: {
      type: DataTypes.ENUM(frequencyEnum),
      validate: {
        isIn: {
          args: [frequencyEnum],
          msg: `Frequency must be one of: ${[...frequencyEnum]}`,
        },
      },
    },
  },
  {
    tableName: "habits",
    timestamps: true,
  }
);

export default Habit;
