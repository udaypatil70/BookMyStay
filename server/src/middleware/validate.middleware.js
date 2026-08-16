const validate = (schema) => {
  return (req, res, next) => {
    if (schema.body) {
      const errors = schema.body(req.body);
      if (errors) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }
    }
    if (schema.params) {
      const errors = schema.params(req.params);
      if (errors) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }
    }
    if (schema.query) {
      const errors = schema.query(req.query);
      if (errors) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }
    }
    next();
  };
};

export default validate;
