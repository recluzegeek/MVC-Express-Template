import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// create a schema
const TodoSchema = new Schema({
  name: String,
  done: Boolean,
});

// create the model
const TodoModel = model('Todo', TodoSchema);

// export the model
export default TodoModel;
