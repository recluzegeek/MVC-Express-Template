import Debug from "debug";
import chalk from "chalk";
import Habit from "../../models/habitModel.js";

const debug = Debug("myapp:habitController");
// TODO: try/catch --- exception handling
function getAll(req, res, next) {
  // fetch all habits
  debug(chalk.yellow(`Received new Request: ${req.url}`));
  Habit.findAll()
    .then((habits) => {
      res.json(habits);
    })
    .catch((error) => debug(chalk.red(`Data fetching unsuccesfull: ${error}`)));
}

function create(req, res) {
  // create new habit
  console.log(req.body);
  const { name, description, category, frequency, status } = req.body;
  Habit.create({
    name,
    description,
    category,
    status,
    frequency,
  })
    .then(() => res.status(200).send("Habit saved successfuly!"))
    .catch((err) => res.status(400).json(err.message));
}

function update(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  debug(chalk.yellow(`Received update request for ID# : ${id} with data: ${JSON.stringify(updateData)}`));

  // Remove fields that are undefined to avoid overwriting with undefined
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No valid fields provided for update" });
  }

  Habit.update(updateData, { where: { id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Habit not found" });
      }
      res.json("Habit updated successfully!");
    })
    .catch((err) => res.status(400).json({ error: err.message }));
}

export default { getAll, create, update };
