const mongoose = require("./config");
const config = require("../config");
const logger = require("../config/logger");

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      dbName: config.mongo.dbName,
    });

    logger.info("MongoDB connected successfully.");
    logger.info(`Database: ${mongoose.connection.name}`);
    logger.info(`Host: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error({
      message: "Failed to connect to MongoDB.",
      stack: error.stack,
    });

    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  logger.info("MongoDB connection established.");
  logger.info(`Database: ${mongoose.connection.name}`);
  logger.info(`Host: ${mongoose.connection.host}`);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected.");
});

mongoose.connection.on("error", (error) => {
  logger.error({
    message: "MongoDB connection error.",
    stack: error.stack,
  });
});

module.exports = connectDatabase;
