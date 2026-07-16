const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const config = require("./config");
const routes = require("./routes");
const errorHandler = require("./common/middlewares/errorHandler");

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

// HTTP request logger
app.use(morgan("dev"));

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
  return res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    data: null,
    errors: null,
  });
});

/**
 * ===========================================
 * Global Error Handler
 * ===========================================
 */

app.use(errorHandler);

module.exports = app;
