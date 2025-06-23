import Debug from 'debug';
import chalk from 'chalk';
import Habbit from '../../models/habbitModel.js';

const debug = Debug('myapp:habbitController');
// TODO: try/catch --- exception handling
function getAll(req, res, next) {
  // fetch all habbits
  debug(chalk.yellow(`Received new Request: ${req.url}`));
  Habbit.findAll()
    .then((habbits) => {
      res.json(habbits);
    }).catch((error) => debug(chalk.red(`Data fetching unsuccesfull: ${error}`)));
}

function create(req, res) {
  // create new habbit
  console.log(req.body);
  const { name, frequency, status } = req.body;
  Habbit.create({
    name,
    status,
    frequency,
  }).then(() => res.status(200).send('Habbit saved successfuly!'))
    .catch((err) => res.status(400).json(err.message));
}

function update(req, res) {
  // update habbit status
  const { id } = req.params;
  const { status } = req.body;
  debug(chalk.yellow(`Received updation request bearing ID# : ${id} and new status: ${status}`));

  Habbit.update({ status }, { where: { id } })
    .then(() => res.json('Habbit status updated!'))
    .catch((err) => res.status(400).json(err.message));
}

export default { getAll, create, update };
