import type { Application } from 'express';
import { categoryRouter } from '../app/components/category/category.route.ts';
import { habitRouter } from '../app/components/habit/habit.route.ts';
import { userRouter } from '../app/components/user/user.route.ts';
import { authRouter } from './auth.ts';

// TODO: much of the code can be reused via the use of generics
export function apiRoute(app: Application) {
	app.use('/api', userRouter);
	app.use('/api/auth', authRouter);
	app.use('/api/habits', habitRouter);
	app.use('/api/categories', categoryRouter);
}
