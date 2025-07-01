import { successResponse } from '../../utils/ResponseHandler.js';
import Category from './category.model.js';

async function getAll(_req, res, next) {
	// fetch all categories for admin
	try {
		const categories = await Category.findAll();
		successResponse(res, categories);
	} catch (err) {
		next(err);
	}
}

async function create(req, res, next) {
	// create new category
	try {
		const { name, description } = req.body;

		const data = await Category.create({ name, description });
		successResponse(res, { id: data.id }, 'Category saved successfuly!');
	} catch (err) {
		next(err);
	}
}

export default { getAll, create };
