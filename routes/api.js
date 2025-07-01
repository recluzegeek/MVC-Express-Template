import categoryRouter from '../app/components/category/category.route.js';
import habitRouter from '../app/components/habit/habit.route.js';
import userRouter from '../app/components/user/user.route.js';

export default function (app) {
	// Routes prefix
	app.use('/api', userRouter);
	app.use('/api/habits', habitRouter);
	app.use('/api/categories', categoryRouter);
}
