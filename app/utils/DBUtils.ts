import type { Model, ModelStatic } from 'sequelize';
import { User } from '../models/index.ts';
import { RecordNotFoundError } from './errors/DatabaseError.js';

export async function checkExistenceById<M extends Model>(
	id: string | number,
	model: ModelStatic<M>,
	name = 'Record',
): Promise<M> {
	const record = await model.findByPk(id);
	if (!record) {
		throw new RecordNotFoundError(name, id.toString(), 404);
	}
	return record;
}

// TODO: pass in generic sequelize model based for locating it via any attribute, typically with id/username/email

export async function checkExistenceByEmail(email: string, model = User, name = 'User'): Promise<User> {
	const record: User = await model.findOne({ where: { email } });
	if (!record) {
		throw new RecordNotFoundError(name, email, 404);
	}
	return record;
}
