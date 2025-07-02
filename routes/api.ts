import type { Application } from 'express';

import { categoryRouter } from '../app/components/category/category.route.js';
import { habitRouter } from '../app/components/habit/habit.route.js';
import { userRouter } from '../app/components/user/user.route.js';
import { authRouter } from './auth.js';

export function apiRoute(app: Application) {
	// Routes prefix
	app.use('/api', userRouter);
	app.use('/api/auth', authRouter);
	app.use('/api/habits', habitRouter);
	app.use('/api/categories', categoryRouter);
}
