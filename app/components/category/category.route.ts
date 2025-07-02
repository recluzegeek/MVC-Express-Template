import express from 'express';
import { requireAuthenticatedUser } from '../../middleware/auth/RequireAuthenticatedUser.js';
import validationMiddleware from '../../middleware/ValidationMiddleware.js';
import categoryController from './category.controller.js';
import { createCategorySchema } from './category.request.js';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAll);

categoryRouter.use(requireAuthenticatedUser);
categoryRouter.post(
	'/create',
	validationMiddleware(createCategorySchema),
	categoryController.create,
);

export { categoryRouter };
