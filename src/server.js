const app = require("./app");
const config = require("./config");

const server = app.listen(config.port, () => {
  console.log(`
=========================================
Personal Health Companion API Started
=========================================
Environment : ${config.env}
Port        : ${config.port}
API Version : v1
=========================================
`);
});

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
