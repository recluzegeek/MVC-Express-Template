import express from 'express';
import { validationMiddleware } from '../../middleware/ValidationMiddleware.ts';
import habitController from './habit.controller.ts';
import { createHabitSchema, updateHabitSchema } from './habit.request.ts';

const habitRouter = express.Router();

// habitRouter.use(requireAuthenticatedUser);

habitRouter.get('/', habitController.getAll);
habitRouter.post('/create', validationMiddleware(createHabitSchema), habitController.create);
habitRouter.put('/update/:id', validationMiddleware(updateHabitSchema), habitController.update);

export { habitRouter };
