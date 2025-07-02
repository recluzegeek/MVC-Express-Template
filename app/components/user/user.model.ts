import { hash } from 'bcrypt';
import {
	type CreationOptional,
	DataTypes,
	type HasOneGetAssociationMixin,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from 'sequelize';
import { sequelize } from '../../../config/db.js';
import type { Habit } from '../habit/habit.model.js';

// Inspired and taken from: https://sequelize.org/docs/v6/other-topics/typescript/#usage
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare email: string;
	declare password: string;
	declare username: string;
	// createdAt & updatedAt can be undefined during creation
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	// https://stackoverflow.com/questions/78266493/sequelize-typescript-no-association-methods#comment138391068_78266493
	// https://sequelize.org/docs/v6/other-topics/typescript/#usage
	declare getHabits: HasOneGetAssociationMixin<Habit>;
}

User.init(
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
				notEmpty: { msg: 'Name must not be empty' },
				len: {
					args: [3, 30],
					msg: 'Name must be between 3 and 30 characters',
				},
			},
		},
		username: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: true, // constraint
			validate: {
				notEmpty: { msg: 'Username must not be empty' },
				len: {
					args: [3, 15],
					msg: 'Name must be between 3 and 15 characters',
				},
			},
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: { msg: 'Must be a valid email.' },
				len: {
					args: [6, 50],
					msg: 'Email must be between 6 and 50 characters',
				},
			},
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false,
			validate: {
				len: {
					args: [8, 64],
					msg: 'Password must be between 8 and 64 characters',
				},
			},
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		hooks: {
			beforeCreate: async (user, _options) => {
				user.password = await hash(user.password, 10);
			},
		},
		tableName: 'users',
		timestamps: true,
		sequelize,
	},
);

export { User };
