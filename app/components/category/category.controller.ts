import type { NextFunction, Request, Response } from 'express';
import { successResponse } from '../../utils/ResponseHandler.js';
import { Category } from './category.model.js';

async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
	// fetch all categories for admin
	try {
		const categories: Category[] = await Category.findAll();
		successResponse(res, categories);
	} catch (err) {
		next(err);
	}
}

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
	// create new category
	try {
		const { name, description } = req.body;

		const data: Category = await Category.create({ name, description });
		successResponse(res, { id: data.id }, 'Category saved successfuly!');
	} catch (err) {
		next(err);
	}
}

// biome-ignore lint/style/noDefaultExport: more readable
export default { getAll, create };
