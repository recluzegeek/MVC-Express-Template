import express from 'express';
import { requireAuthenticatedUser } from '../../middleware/auth/RequireAuthenticatedUser.js';
import validationMiddleware from '../../middleware/ValidationMiddleware.js';
import habitController from './habit.controller.js';
import { createHabitSchema, updateHabitSchema } from './habit.request.js';

const habitRouter = express.Router();

habitRouter.use(requireAuthenticatedUser);

habitRouter.get('/', habitController.getAll);
habitRouter.post('/create', validationMiddleware(createHabitSchema), habitController.create);
habitRouter.put('/update/:id', validationMiddleware(updateHabitSchema), habitController.update);

export { habitRouter };
