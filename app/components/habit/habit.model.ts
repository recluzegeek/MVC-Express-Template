import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/db.js';

// sequelize or any ORM enforces validation at model level, not at application level
// (before request hit the db). We  need to use a dedicated validator like joi,
//  or express-validator for this purpose

// Bar.belongsTo(Foo) // one-to-one relation: with foreign key stored in Bar (source)
// Habit.belongsTo(User)  // one-to-one relation: with foreign key stored in Habit (user_id - foreign key)

// const-assetion: https://stackoverflow.com/a/66993654
export const FrequencyEnum = {
	daily: 'Daily',
	weekly: 'Weekly',
	monthly: 'Monthly',
	biWeekly: 'BiWeekly',
} as const;

export const StatusEnum = {
	pending: 'Pending',
	inProgress: 'In Progress',
	done: 'Done',
} as const;

export type FrequencyEnum = (typeof FrequencyEnum)[keyof typeof FrequencyEnum];
export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];

const Habit = sequelize.define(
	'Habit',
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
				notEmpty: { msg: 'Name must not be empty' },
				len: {
					args: [2, 200],
					msg: 'Name must be between 2 and 200 characters',
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [10, 500],
					msg: 'Description must be between 10 and 500 characters',
				},
			},
		},
		status: {
			type: DataTypes.ENUM(...Object.values(StatusEnum)),
			defaultValue: 'Pending',
			validate: {
				isIn: {
					// sequelize expects an array of arrays, and not just an arrays of string
					args: [[...Object.values(StatusEnum)]],
					msg: `Status must be one of: ${Object.values(StatusEnum).join(', ')}`,
				},
			},
		},
		frequency: {
			type: DataTypes.ENUM(...Object.values(FrequencyEnum)),
			validate: {
				isIn: {
					args: [[...Object.values(FrequencyEnum)]],
					msg: `Frequency must be one of: ${[Object.values(FrequencyEnum).join(', ')]}`,
				},
			},
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},

		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'categories',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		},
	},
	{
		tableName: 'habits',
		timestamps: true,
	},
);

export { Habit };
