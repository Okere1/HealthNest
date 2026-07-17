const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const config = require("./config");
const logger = require("./config/logger");

const routes = require("./routes");
const errorHandler = require("./common/middlewares/errorHandler");
const ApiResponse = require("./common/utils/apiResponse");

const app = express();

/**
 * ===========================================
 * Global Middlewares
 * ===========================================
 */

// Secure HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: config.client.url,
    credentials: true,
  }),
);

// Compress response bodies
app.use(compression());

/**
 * HTTP Request Logging
 *
 * Morgan formats the request.
 * Winston decides where to write it.
 */
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  }),
);

// Parse incoming JSON requests
app.use(express.json());

// Parse URL encoded payloads
app.use(express.urlencoded({ extended: true }));

/**
 * ===========================================
 * Routes
 * ===========================================
 */

app.use("/api/v1", routes);

/**
 * ===========================================
 * 404 Handler
 * ===========================================
 */

app.use((req, res) => {
  return ApiResponse.notFound(res, {
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

/**
 * ===========================================
 * Global Error Handler
 * ===========================================
 */

app.use(errorHandler);

module.exports = app;
