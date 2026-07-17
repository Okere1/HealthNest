const config = require("../../config");
const HTTP_STATUS = require("../constants/httpStatus");

class ApiResponse {
  /**
   * Build a standardized API response.
   * @private
   */
  static send(
    res,
    { statusCode, success, message, data = null, errors = null, meta = null },
  ) {
    const response = {
      success,
      message,
      data,
      errors,
      meta,
    };

    if (config.response.includeTimestamp) {
      response.timestamp = new Date().toISOString();
    }

    return res.status(statusCode).json(response);
  }

  /**
   * HTTP 200
   */
  static success(res, { message = "Success", data = null, meta = null }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message,
      data,
      meta,
    });
  }

  /**
   * HTTP 201
   */
  static created(res, { message = "Created successfully", data = null }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message,
      data,
    });
  }

  /**
   * HTTP 400
   */
  static badRequest(res, { message = "Bad Request", errors = null }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      success: false,
      message,
      errors,
    });
  }

  /**
   * HTTP 401
   */
  static unauthorized(res, { message = "Unauthorized" }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      success: false,
      message,
    });
  }

  /**
   * HTTP 403
   */
  static forbidden(res, { message = "Forbidden" }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.FORBIDDEN,
      success: false,
      message,
    });
  }

  /**
   * HTTP 404
   */
  static notFound(res, { message = "Resource not found" }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      success: false,
      message,
    });
  }

  /**
   * HTTP 409
   */
  static conflict(res, { message = "Conflict", errors = null }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.CONFLICT,
      success: false,
      message,
      errors,
    });
  }

  /**
   * Generic failure response
   */
  static failure(
    res,
    {
      statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message = "Request failed",
      errors = null,
      data = null,
      meta = null,
    },
  ) {
    return this.send(res, {
      statusCode,
      success: false,
      message,
      data,
      errors,
      meta,
    });
  }

  /**
   * HTTP 500
   */
  static error(res, { message = "Internal Server Error", errors = null }) {
    return this.send(res, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      success: false,
      message,
      errors,
    });
  }
}

module.exports = ApiResponse;
