const app = require("./app");
const config = require("./config");
const logger = require("./config/logger");
const connectDatabase = require("./database/connection");

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      logger.info(`
=========================================
Personal Health Companion API Started
=========================================
Environment : ${config.env}
Port        : ${config.port}
API Version : v1
=========================================
`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  server.close(() => {
    console.log("Server stopped successfully.");
    process.exit(0);
  });
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
