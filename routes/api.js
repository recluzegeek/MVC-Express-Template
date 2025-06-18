/* eslint-disable global-require, func-names */

module.exports = function (app) {
  // home
  // app.use('/api', require('../app/controllers/Api/home'));

  const habbitsController = require('../app/controllers/Api/habbits')

  app.get('/habbits', habbitsController.getAll);
  app.post('/habbit/create', habbitsController.create);
  app.put('/habbit/update', habbitsController.update);
};
