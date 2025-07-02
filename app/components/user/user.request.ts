import Joi from 'joi';

// alphanumeric password between 8 and 64 characters length having at least 2 special characters and 2 numbers
const passwordRegex =
	/^(?=(?:.*[!@#$%^&*()\-_=+{}[\]|:;"'<>,.?/~`]){2,})(?=(?:.*\d){2,})[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|:;"'<>,.?/~`]{8,64}$/;

const baseUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).trim().required().messages({
		'string.base': 'Name must be a string',
		'string.empty': 'Name cannot be empty',
		'string.min': 'Name should have at least 3 characters',
		'string.max': 'Name should have at most 30 characters',
		'any.required': 'Name is required',
	}),

	username: Joi.string().min(3).max(15).trim().required().messages({
		'string.base': 'Username must be a string',
		'string.empty': 'Username cannot be empty',
		'string.min': 'Username should have at least 3 characters',
		'string.max': 'Username should have at most 15 characters',
		'any.required': 'Username is required',
	}),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.messages({
			'string.base': 'Email must be a string',
			'string.empty': 'Email cannot be empty',
			'string.min': 'Email should have at least 3 characters',
			'string.max': 'Email should have at most 15 characters',
			'any.required': 'Email is required',
		})
		.required(),

	password: Joi.string()
		.pattern(passwordRegex)
		.messages({
			'string.pattern.base':
				'Password must be 8–64 characters long, include at least 2 numbers and 2 special characters.',
			'string.empty': 'Password cannot be empty',
			'any.required': 'Password is required',
		})
		.required(),

	repeatPassword: Joi.ref('password'),
}).with('password', 'repeatPassword');

const updateUserSchema = baseUserSchema
	.fork(Object.keys(baseUserSchema.describe().keys ?? {}), (schema) => schema.optional())
	.min(1)
	.message(
		`Must have at least one of the following keys: ${Object.keys(
			baseUserSchema.describe().keys,
		).join(', ')}`,
	);

export { baseUserSchema as createUserSchema, updateUserSchema };
