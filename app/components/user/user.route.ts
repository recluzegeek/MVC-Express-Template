import express from 'express';
import { validationMiddleware } from '../../middleware/ValidationMiddleware.ts';
import userController from './user.controller.ts';
import { createUserSchema, updateUserSchema } from './user.request.ts';

const userRouter = express.Router();

userRouter.post('/signup', validationMiddleware(createUserSchema), userController.create);

// userRouter.use(requireAuthenticatedUser);
userRouter.get('/', userController.getAll);
// userRouter.get('/habits/:id', userController.getHabits());
userRouter.put('/update/:id', validationMiddleware(updateUserSchema), userController.update);

export { userRouter };
