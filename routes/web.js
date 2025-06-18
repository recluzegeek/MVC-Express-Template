/* eslint-disable global-require, func-names */

module.exports = function (app) {
  // home
  app.use('/', require('../app/controllers/home'));

  // return all habbits
  // create new habbit
  // update the status of the habbit
};
