import User from '../components/user/user.model.js';
import { RecordNotFoundError } from './errors/DatabaseError.js';

export async function checkExistenceById(id, name = 'Record', model = User) {
	const record = await model.findByPk(id);
	if (!record) {
		throw new RecordNotFoundError(name, id, 404);
	}
	return record;
}

export async function checkExistenceByEmail(email, name = 'User', model = User) {
	const record = await model.findOne({ where: { email } });
	if (!record) {
		throw new RecordNotFoundError(name, email, 404);
	}
	return record;
}
