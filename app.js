import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env);

const app = express();

import Debug from 'debug';
const debug = Debug("myapp:app")


// config
import config from './config/config.js';

// database config
import db from './config/db.js';

// view engine setup
app.set('views', path.join(__dirname(), 'app/views'));
app.set('view engine', 'pug');

app.use(logger(config.isProd ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname(), 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname(), 'public')));

// bootstrap routes
import webRoute from './routes/web.js'
import apiRoute from './routes/api.js'
webRoute(app)
apiRoute(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line no-param-reassign
  res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.on('connected', () => {
  app.listen(config.server.port, config.server.hostname, () => {
    console.log(`www.${config.server.hostname  }:${  config.server.port}`);
    debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);
    app.emit('appStarted');
  });
});

function __dirname(){
  return import.meta.dirname;
}

export default app;
