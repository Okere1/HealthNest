const bcrypt = require("bcrypt");
const User = require("./user.model");
const config = require("../../config/index");
const { toPublicUser } = require("./user.mapper");
const { ConflictError } = require("../../common/errors");
const logger = require("../../config/logger");
const { hashPassword } = require("../../common/securtity/password");

const SALT_ROUNDS = 12;

const register = async (payload) => {
  // Normalize email
  const email = payload.email.trim().toLowerCase();

  // Check for existing user
  logger.info({
    message: "Checking for existing user",
    email,
  });

  const existingUser = await User.findOne({ email });

  logger.info({
    message: "Existing user result",
    existingUser,
  });

  if (existingUser) {
    throw new ConflictError("An account with this email already exists.");
  }

  // Hash password
  const hashedPassword = await hashPassword(payload.password);

  // Create user
  const user = await User.create({
    ...payload,
    email,
    password: hashedPassword,
  });

  logger.info({
    message: "New user registered.",
    userId: user._id,
    email: user.email,
  });

  // Return user without password
  return toPublicUser(user);
};

module.exports = {
  register,
};
