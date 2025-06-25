import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Habit from "./habitModel.js";

// TODO: add user association with habits
// TODO: hash password before storing

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name must not be empty" },
        len: {
          args: [3, 30],
          msg: "Name must be between 3 and 30 characters",
        },
      },
    },
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true, // constraint
      validate: {
        notEmpty: { msg: "Username must not be empty" },
        len: {
          args: [3, 15],
          msg: "Name must be between 3 and 15 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email." },
        len: {
          args: [6, 50],
          msg: "Email must be between 6 and 50 characters",
        },
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [8, 64],
          msg: "Password must be between 8 and 64 characters",
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

// User.hasMany(Habit, {
//   onDelete: "CASCADE",
//   onUpdate: "RESTRICT",
//   foreignKey: {
//     type: DataTypes.UUID,
//     name: "user_id",
//   },
// });

// User.sync();

export default User;
