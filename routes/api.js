/* eslint-disable global-require, func-names */

import habbitsController from '../app/controllers/Api/habbits.js';

export default function (app) {
  // home

  app.get('/habbits', habbitsController.getAll);
  app.post('/habbit/create', habbitsController.create);
  app.put('/habbit/update', habbitsController.update);
};
