/* eslint-disable global-require, func-names */

import habbitsController from '../app/controllers/Api/habbitController.js';

export default function (app) {

  // Routes prefix
  app.use('/api', () => {
    app.get('/habbits', habbitsController.getAll);
    app.post('/habbit/create', habbitsController.create);
    app.put('/habbit/update/:id', habbitsController.update); // use id as req.params
  });
};
