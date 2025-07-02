import Joi from 'joi';

import { FrequencyEnumValues, StatusEnumValues } from './habit.model.ts';

const baseHabitSchema = Joi.object({
	name: Joi.string().min(3).max(30).trim().required().messages({
		'string.base': 'Name must be a string',
		'string.empty': 'Name cannot be empty',
		'string.min': 'Name should have at least 3 characters',
		'string.max': 'Name should have at most 30 characters',
		'any.required': 'Name is required',
	}),

	description: Joi.string().min(10).max(100).trim().required().messages({
		'string.base': 'Description must be a string',
		'string.empty': 'Description cannot be empty',
		'string.min': 'Description should have at least 10 characters',
		'string.max': 'Description should have at most 100 characters',
		'any.required': 'Description is required',
	}),

	frequency: Joi.string()
		.valid(...FrequencyEnumValues)
		.required()
		.messages({
			'any.only': `Frequency must be one of [${FrequencyEnumValues.join(', ')}]`,
			'any.required': 'Frequency is required',
		}),

	userId: Joi.string().uuid().required().messages({
		'string.base': 'User ID must be a string.',
		'string.empty': 'User ID cannot be empty.',
		'string.guid': 'User ID must be a valid UUID.',
		'any.required': 'User ID is required.',
	}),

	categoryId: Joi.number().integer().min(1).required().messages({
		'number.base': 'Category ID must be an integer number.',
		'number.empty': 'Category ID cannot be empty.',
		'any.required': 'Category ID is required.',
	}),

	status: Joi.string()
		.valid(...StatusEnumValues)
		.required()
		.messages({
			'any.only': `Status must be one of [${StatusEnumValues.join(', ')}]`,
			'any.required': 'Status is required',
		}),
});

// keep the same base habit schema, yet modify required() => optional()
const updateHabitSchema = baseHabitSchema
	.fork(Object.keys(baseHabitSchema.describe().keys ?? {}), (schema) => schema.optional())
	.keys({
		userId: Joi.string().uuid().required().messages({
			'string.base': 'User ID must be a string.',
			'string.empty': 'User ID cannot be empty.',
			'string.guid': 'User ID must be a valid UUID.',
			'any.required': 'User ID is required.',
		}),
	})
	.min(2)
	.message(
		`Must have at least one of the following keys: ${Object.keys(
			baseHabitSchema.describe().keys,
		).join(', ')}`,
	);

const getHabitSchema = Joi.object({
	userId: Joi.string().uuid().required().messages({
		'string.base': 'User ID must be a string.',
		'string.empty': 'User ID cannot be empty.',
		'string.guid': 'User ID must be a valid UUID.',
		'any.required': 'User ID is required.',
	}),
});

export { baseHabitSchema as createHabitSchema, updateHabitSchema, getHabitSchema };
