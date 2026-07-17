const AppError = require("./AppError");
const HTTP_STATUS = require("../constants/httpStatus");

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

module.exports = BadRequestError;
