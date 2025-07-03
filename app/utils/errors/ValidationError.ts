// Joi or request validation errors
import { AppError } from './AppError.ts';

export class ValidationError extends AppError {
	constructor(errors: string[] = [], statusCode = 422) {
		super('Validation Failed', statusCode, errors);
		this.name = 'ValidationError';
	}
}

export class OwnershipError extends AppError {
	id: string;

	constructor(entity: string, id: string, statusCode = 403) {
		super(`${entity} with ID '${id}' does not belong to the current user.`, statusCode, []);
		this.name = 'OwnershipError';
		this.status = 'unauthorized';
		this.id = id;
	}
}
