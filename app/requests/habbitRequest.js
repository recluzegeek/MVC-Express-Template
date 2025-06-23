// TODO: JOI Request Validation
import Joi from "joi";

const categoryEnum = ['Health', 'Tech', 'Social', 'Knowledge', 'Hobby', 'House Chores']
const frequencyEnum = ['Daily', 'Weekly', 'Monthly', 'BiWeekly']
const statusEnum = ['Pending', 'In Progress', 'Done']

const habitSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().trim().min(10).max(100).required(),
    category: Joi.string().valid(...categoryEnum).required(),
    frequency: Joi.string().valid(...frequencyEnum).required(),
    status: Joi.string().valid(...statusEnum).required(),
});

export default habitSchema;