import Joi from "joi";

const categoryEnum = [
  "Health",
  "Tech",
  "Social",
  "Knowledge",
  "Hobby",
  "House Chores",
];
const frequencyEnum = ["Daily", "Weekly", "Monthly", "BiWeekly"];
const statusEnum = ["Pending", "In Progress", "Done"];

const baseHabitSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should have at most 30 characters",
    "any.required": "Name is required",
  }),

  description: Joi.string().min(10).max(100).trim().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description should have at least 10 characters",
    "string.max": "Description should have at most 100 characters",
    "any.required": "Description is required",
  }),

  category: Joi.string()
    .valid(...categoryEnum)
    .required()
    .messages({
      "any.only": `Category must be one of [${categoryEnum.join(", ")}]`,
      "any.required": "Category is required",
    }),

  frequency: Joi.string()
    .valid(...frequencyEnum)
    .required()
    .messages({
      "any.only": `Frequency must be one of [${frequencyEnum.join(", ")}]`,
      "any.required": "Frequency is required",
    }),

  status: Joi.string()
    .valid(...statusEnum)
    .required()
    .messages({
      "any.only": `Status must be one of [${statusEnum.join(", ")}]`,
      "any.required": "Status is required",
    }),
});

// keep the same base habit schema, yet modify required() => optional() 
const updateHabitSchema = baseHabitSchema.fork(
  Object.keys(baseHabitSchema.describe().keys),
  (schema) => schema.optional()
).min(1);

export { baseHabitSchema as createHabitSchema, updateHabitSchema };
