import Joi from "joi";

const baseCategorySchema = Joi.object({
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

  user_id: Joi.string().uuid().optional().messages({
    "string.base": "User ID must be a string.",
    "string.empty": "User ID cannot be empty.",
    "string.guid": "User ID must be a valid UUID.",
    // "any.required": "User ID is required.",
  }),
});

export { baseCategorySchema as createCategorySchema };
