import path from 'node:path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

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

// view engine setup
// app.set('views', path.join(__dirname(), 'app/views'));
// app.set('view engine', 'pug');

// app.use(logger(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(favicon(path.join(__dirname(), 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname(), 'public')));
app.use(httpLogger);

import apiRoute from './routes/api.js';
import auth from './routes/auth.js';
// bootstrap routes
import webRoute from './routes/web.js';

auth(app);
webRoute(app);
apiRoute(app);

app.use(errorMiddleware);

process.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception:', err);
	process.exit(1);
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, _req, res, _next) => {
	// set locals, only providing error in development
	res.locals.message = err.message; // eslint-disable-line no-param-reassign
	res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

try {
	await connectToDB();
	// await sequelize.sync({ alter: true });
	app.listen(config.server.port, config.server.hostname, () => {
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
