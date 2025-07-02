import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from 'sequelize';
import { sequelize } from '../../../config/db.js';

// sequelize or any ORM enforces validation at model level, not at application level
// (before request hit the db). We  need to use a dedicated validator like joi,
//  or express-validator for this purpose

// Bar.belongsTo(Foo) // one-to-one relation: with foreign key stored in Bar (source)
// Habit.belongsTo(User)  // one-to-one relation: with foreign key stored in Habit (user_id - foreign key)

// const-assetion: https://stackoverflow.com/a/66993654
const FrequencyEnum = {
	daily: 'Daily',
	weekly: 'Weekly',
	monthly: 'Monthly',
	biWeekly: 'BiWeekly',
} as const;

const StatusEnum = {
	pending: 'Pending',
	inProgress: 'In Progress',
	done: 'Done',
} as const;

export const FrequencyEnumValues = Object.values(FrequencyEnum);
export const StatusEnumValues = Object.values(StatusEnum);

export type FrequencyEnumType = (typeof FrequencyEnumValues)[number];
export type StatusEnumType = (typeof StatusEnumValues)[number];

class Habit extends Model<InferAttributes<Habit>, InferCreationAttributes<Habit>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string;
	declare categoryId: string;
	declare userId: string;
	declare frequency: string;
	declare status: string;
	// createdAt & updatedAt can be undefined during creation
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

Habit.init(
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
			type: DataTypes.ENUM(...StatusEnumValues),
			defaultValue: 'Pending',
			validate: {
				isIn: {
					// sequelize expects an array of arrays, and not just an arrays of string
					args: [[...StatusEnumValues]],
					msg: `Status must be one of: ${StatusEnumValues.join(', ')}`,
				},
			},
		},
		frequency: {
			type: DataTypes.ENUM(...FrequencyEnumValues),
			validate: {
				isIn: {
					args: [[...FrequencyEnumValues]],
					msg: `Frequency must be one of: ${FrequencyEnumValues.join(', ')}`,
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
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		tableName: 'habits',
		timestamps: true,
		sequelize,
	},
);

export { Habit };
