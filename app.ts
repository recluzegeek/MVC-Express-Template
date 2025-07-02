import path from 'node:path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import { AppError } from './app/utils/errors/AppError.js';

dotenv.config();
const app = express();

import { errorMiddleware } from './app/middleware/ErrorHandlerMiddleware.js';
import { httpLogger } from './app/middleware/HttpLoggerMiddleware.js';

//logger config
import logger from './app/utils/Logger.js';
// config
import config from './config/config.js';
// database config
import { connectToDB } from './config/db.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname(), 'public')));
app.use(httpLogger);

import { apiRoute } from './routes/api.js';
import { webRoute } from './routes/web.ts';

// bootstrap routes
webRoute(app);
apiRoute(app);

app.use(errorMiddleware);

process.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception:', err);
	process.exit(1);
});

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const err = new AppError('Not Found', 404);
	next(err);
});

// error handler
app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message; // eslint-disable-line no-param-reassign
	res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
	// render the error page
	res.status(err.statusCode || 500);
	res.render('error');
});

try {
	// await sequelize.sync({ alter: true });
	app.listen(config.server.port, config.server.hostname, () => {
		async () => await connectToDB();
		logger.info(`Server running on: www.${config.server.hostname}:${config.server.port}`);
		logger.info(`App listening on ${config.server.hostname} port: ${config.server.port}`);
		app.emit('appStarted');
	});
} catch (error) {
	logger.error(`Error Occured while running the app: ${error}`);
}

function __dirname() {
	return import.meta.dirname;
}

export { app };
