const AppError = require("./AppError");
const HTTP_STATUS = require("../constants/httpStatus");

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

module.exports = ConflictError;
