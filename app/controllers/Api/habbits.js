// 1. return all habbits
// 2. create new habbit
// 3. update the status of the habbit


const express = require('express');

const router = express.Router();

const Habbit = require('../../models/habbit');

module.exports = {
  getAll: (req, res, next) => {
    // fetch all habbits
    Habbit.find()
      .then(habbits => res.json(habbits))
      .catch((err) => {
        res.json(err.message)
        console.log(err);
      });
  },
  create: (req, res) => {
    // create new habbit
    console.log(req.body);
    const { name, frequency, status } = req.body
    Habbit.create({
      name,
      status,
      frequency
    }).then(() => res.status(200).send('Habbit saved successfuly!'))
      .catch(err => res.status(400).json(err.message));
  },
  update: (req, res) => {
    // update habbit status
    const { id, status } = req.body;
    Habbit.findByIdAndUpdate(id, { status: status }, { runValidators: true })
      .then(() => res.json('Habbit status updated!'))
      .catch(err => res.status(400).json(err.message))
  }
};
