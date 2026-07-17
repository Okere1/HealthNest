const logger = require("../../config/logger");
const config = require("../../config");
const ApiResponse = require("../utils/apiResponse");
const { AppError } = require("../errors");
const HTTP_STATUS = require("../constants/httpStatus");

const errorHandler = (err, req, res, next) => {
  // Determine whether this is one of our custom application errors
  const isOperational = err instanceof AppError;

  // Determine HTTP status code
  const statusCode = isOperational
    ? err.statusCode
    : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  // Determine response message
  const message = isOperational ? err.message : "Internal Server Error";

  // Log full error details
  logger.error({
    name: err.name,
    message: err.message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    stack: err.stack,
  });

  // Build error payload
  const errors =
    config.env === "development"
      ? {
          name: err.name,
          stack: err.stack,
        }
      : null;

  return ApiResponse.failure(res, {
    statusCode,
    message,
    errors,
  });
};

module.exports = errorHandler;
