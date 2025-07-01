import express from 'express';
import { requireAuthenticatedUser } from '../../middleware/auth/RequireAuthenticatedUser.js';
import validationMiddleware from '../../middleware/ValidationMiddleware.js';
import userController from './user.controller.js';
import { createUserSchema, updateUserSchema } from './user.request.js';

const userRouter = express.Router();

userRouter.post('/signup', validationMiddleware(createUserSchema), userController.create);

userRouter.use(requireAuthenticatedUser);
userRouter.get('/', userController.getAll);
userRouter.get('/habits/:id', userController.getHabits);
userRouter.put('/update/:id', validationMiddleware(updateUserSchema), userController.update);

export default userRouter;
