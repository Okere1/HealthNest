const AppError = require("./AppError");
const HTTP_STATUS = require("../constants/httpStatus");

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

module.exports = ForbiddenError;
