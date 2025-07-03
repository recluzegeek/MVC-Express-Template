import { AppError } from './AppError.ts';

export class DatabaseError extends AppError {
	constructor(message = 'Database operation failed', errors: string[] = [], statusCode = 500) {
		super(message, statusCode, errors);
		this.name = 'DatabaseError';
	}
}

export class ForeignKeyConstraintError extends DatabaseError {
	constructor(message = 'Foreign key constraint failed', errors: string[] = [], statusCode = 409) {
		super(message, errors, statusCode);
		this.name = 'ForeignKeyConstraintError';
	}
}

export class UniqueConstraintError extends DatabaseError {
	constructor(message = 'Unique constraint failed', errors: string[] = [], statusCode = 409) {
		super(message, errors, statusCode);
		this.name = 'UniqueConstraintError';
	}
}

export class RecordNotFoundError extends DatabaseError {
	constructor(modelName = 'Record', id = '', statusCode = 404) {
		super('Record Not Found', [`${modelName} with ID ${id} not found`], statusCode);
		this.name = 'RecordNotFoundError';
	}
}

export class InvalidCredentialsError extends DatabaseError {
	constructor(statusCode = 401) {
		super('Invalid Credentials', ['Login failed. Invalid email or password.'], statusCode);
		this.name = 'InvalidCredentialsError';
	}
}

export class SequelizeValidationError extends DatabaseError {
	constructor(message = 'Sequelize Validation Error', errors: string[] = [], statusCode = 422) {
		super(message, errors, statusCode);
		this.name = 'SequelizeValidationError';
	}
}
