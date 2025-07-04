import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/db.js';

// TODO: hash password before storing
const User = sequelize.define(
	'User',
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
		// storing JWT refreshTokens in DB, so they could be revoked for logout purposes, and others which i was unable to comprehend
		// refreshToken: {
		//   type: DataTypes.STRING(),
		// },
	},
	{
		tableName: 'users',
		timestamps: true,
		underscored: true,
	},
);

export default User;
