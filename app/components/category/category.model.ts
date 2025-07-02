import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/db.js';

const Category = sequelize.define(
	'Category',
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
	},
	{
		tableName: 'categories',
		timestamps: true,
	},
);

export { Category };
