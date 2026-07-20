const ValidationError = require("../errors/ValidationError");

const validate = (schema, property = "body") => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      req[property] = value;

      next();
    } catch (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      next(new ValidationError("Validation failed", errors));
    }
  };
};

module.exports = validate;
