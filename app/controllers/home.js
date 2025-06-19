import { Router } from 'express';

const router = Router();

import Todo from '../models/todo.js';
import { randomString } from '../helpers/utils.js';

// get home page
router.get('/', (req, res, next) => {
  // generate a new name
  const name = randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('index', { title: 'Express' });
});

export default router;
