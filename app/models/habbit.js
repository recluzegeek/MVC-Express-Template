import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// create a schema
const HabbitSchema = new Schema({
  name:{
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['Done', 'Pending'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Bi-Weekly', 'Monthly'],
    default: 'Daily',
    required: true
  }
}, {timestamps: true});

// create the model
const HabbitModel = model('Habbit', HabbitSchema);

// export the model
export default HabbitModel;
