const logger = require("../../config/logger");
const config = require("../../config");
const ApiResponse = require("../utils/apiResponse");
const { AppError, ValidationError } = require("../errors");
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

  /**
   * ===========================================
   * Sanitize Request Body Before Logging
   * ===========================================
   */
  const requestBody = { ...req.body };

  if (requestBody.password) {
    requestBody.password = "[REDACTED]";
  }

  if (requestBody.refreshToken) {
    requestBody.refreshToken = "[REDACTED]";
  }

  /**
   * ===========================================
   * Log Full Error Details
   * ===========================================
   */
  logger.error({
    name: err.name,
    message: err.message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    body: requestBody,
    stack: err.stack,
  });

  /**
   * ===========================================
   * Response Errors
   * ===========================================
   */

  let errors = null;

  // Return field-level validation errors
  if (err instanceof ValidationError) {
    errors = err.errors;
  }

  // For unexpected errors, expose stack only in development
  if (!isOperational && config.env === "development") {
    errors = {
      name: err.name,
      stack: err.stack,
    };
  }

  return ApiResponse.failure(res, {
    statusCode,
    message,
    errors,
  });
};

module.exports = errorHandler;
