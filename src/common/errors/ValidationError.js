const AppError = require("./AppError");
const HTTP_STATUS = require("../constants/httpStatus");

class ValidationError extends AppError {
  constructor(message = "Validation failed", errors = []) {
    super(message, HTTP_STATUS.BAD_REQUEST, errors);
  }
}

module.exports = ValidationError;
