import { ValidationError } from './errors/ValidationError.js';

export function sanitizePayload(updateData) {
	// Remove fields that are undefined to avoid overwriting with undefined
	for (const key of Object.keys(updateData)) {
		if (updateData[key] === undefined) {
			delete updateData[key];
		}
	}

	if (Object.keys(updateData).length === 0) {
		throw new ValidationError('No valid fields provided for update.', 400);
	}
	return updateData;
}
