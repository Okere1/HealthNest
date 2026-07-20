const mongoose = require("mongoose");
const config = require("../config");

/**
 * ==========================================
 * Global Mongoose Configuration
 * ==========================================
 */

// Enforce strict query filtering
mongoose.set("strictQuery", true);

// Enable Mongoose debug logging only in development
if (config.env === "development") {
  mongoose.set("debug", false);
}

module.exports = mongoose;
