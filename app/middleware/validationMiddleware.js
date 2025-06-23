// Run JOI validations before the request hits
// the controller. If it passes, continue to controller,
// else respond back with error message's

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) {
      // Send all validation errors back
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    next(); // validation passed, continue to controller
  };
};

export default validationMiddleware;
