// Run JOI validations before the request hits
// the controller. If it passes, continue to controller,
// else respond back with error message's

import { ValidationError } from "../utils/errorHandler.js";

//TODO: ensure the middleware logs the errors

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) {
      // Send all validation errors back
      const errors = error.details.map((detail) => detail.message);
      // console.log(JSON.stringify(errors));
      return next(new ValidationError(errors, 400));
    }
    next(); // validation passed, continue to controller
  };
};

export default validationMiddleware;
