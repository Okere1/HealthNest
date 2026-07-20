// Load environment variables from .env
require("dotenv").config();
const { cleanEnv, str, port, bool, num } = require("envalid");

// Validate and sanitize environment variables
const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development" }),
  PORT: port({ default: 5000 }),
  MONGO_URI: str(),
  MONGO_DB_NAME: str({ default: "healthnest" }),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "1d" }),
  REFRESH_TOKEN_SECRET: str(),
  REFRESH_TOKEN_EXPIRES_IN: str({ default: "7d" }),
  CLIENT_URL: str({ default: "http://localhost:8081" }),
  LOG_LEVEL: str({ default: "info" }),
  INCLUDE_RESPONSE_TIMESTAMP: bool({ default: true }),
  BCRYPT_SALT_ROUNDS: num({ default: 12 }),
});

// Export a structured configuration object
module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongo: {
    uri: env.MONGO_URI,
    dbName: env.MONGO_DB_NAME,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  },
  client: {
    url: env.CLIENT_URL,
  },
  log: {
    level: env.LOG_LEVEL,
  },
  response: {
    includeTimestamp: env.INCLUDE_RESPONSE_TIMESTAMP,
  },
  security: {
    bcryptSaltRounds: env.BCRYPT_SALT_ROUNDS,
  },
};
