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
const swaggerUi = require("swagger-ui-express");
const openApiSpec = require("./docs");

console.log(openApiSpec.paths);

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
 * Swagger Documentation
 * ===========================================
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get("/api-docs.json", (req, res) => {
  res.json(openApiSpec);
});

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
