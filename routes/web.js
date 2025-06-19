/* eslint-disable global-require, func-names */
import homeRouter from '../app/controllers/home.js';

export default function (app) {
  // home

  app.use('/', homeRouter);
};
