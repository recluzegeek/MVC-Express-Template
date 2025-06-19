import mongoose from 'mongoose';
import chalk from 'chalk';
import Debug from 'debug';
const debug = Debug("myapp:app")
import config from './config.js';

// Use native ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url);

const db = mongoose.connection;

db.on('error', (err) => {
  debug(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`);
  debug(chalk.red(`error: Uncaught Error ${err}`));
  process.exit();
});

db.once('open', () => {
  debug('MongoDB connection with database succeeded.');
  console.log('MongoDB connection with database succeeded.');
});

process.on('SIGINT', () => {
  db.close(() => {
    debug('MongoDB connection disconnected through app termination.');
    process.exit();
  });
});

export default db;
