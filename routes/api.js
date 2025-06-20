/* eslint-disable global-require, func-names */

import express from 'express';
import habbitsController from '../app/controllers/Api/habbitController.js';

const router = express.Router();

router.get('/habbits', habbitsController.getAll);
router.post('/habbit/create', habbitsController.create);
router.put('/habbit/update/:id', habbitsController.update); // use id as req.params


export default function (app) {

  // Routes prefix
  app.use('/api', router);
};
