import express from 'express';
import { validationMiddleware } from '../../middleware/ValidationMiddleware.ts';
import categoryController from './category.controller.ts';
import { createCategorySchema } from './category.request.ts';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAll);

// categoryRouter.use(requireAuthenticatedUser);
categoryRouter.post('/create', validationMiddleware(createCategorySchema), categoryController.create);

export { categoryRouter };
