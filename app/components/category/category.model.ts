import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from 'sequelize';
import { sequelize } from '../../../config/db.ts';

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string;
	// createdAt & updatedAt can be undefined during creation
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

Category.init(
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
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		tableName: 'categories',
		timestamps: true,
		sequelize,
	},
);

export { Category };
