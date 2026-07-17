const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../config/logger");

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongo.uri);

    logger.info("MongoDB connected successfully.");

    logger.info(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    logger.error({
      message: "Failed to connect to MongoDB.",
      stack: error.stack,
    });

    process.exit(1);
  }
};

module.exports = connectDatabase;
