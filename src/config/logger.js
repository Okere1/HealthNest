const config = require("./index");
const {
  createLogger,
  format,
  transports,
  config: winstonConfig,
} = require("winston");

const logger = createLogger({
  levels: winstonConfig.npm.levels,

  level: config.log.level,

  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    format.errors({
      stack: true,
    }),

    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}] ${stack}`
        : `${timestamp} [${level.toUpperCase()}] ${message}`;
    }),
  ),

  transports: [
    new transports.Console({
      level: config.log.level,
    }),
  ],
});

/**
 * Development-only log files
 */
if (config.env === "development") {
  logger.add(
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  );

  logger.add(
    new transports.File({
      filename: "logs/combined.log",
    }),
  );
}

module.exports = logger;
