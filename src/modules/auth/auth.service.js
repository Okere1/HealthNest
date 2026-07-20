const bcrypt = require("bcrypt");
const User = require("../users/user.model");
const config = require("../../config");
const logger = require("../../config/logger");

const {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiryDate,
} = require("../../common/auth/jwt");

const { UnauthorizedError } = require("../../common/errors");
const { AUTH_MESSAGES } = require("./auth.constants");
const { toAuthResponse } = require("./auth.mapper");
const {
  comparePassword,
  hashPassword,
} = require("../../common/securtity/password");

const login = async (payload) => {
  const email = payload.email.trim().toLowerCase();

  const user = await User.findOne({
    email,
  }).select("+password +refreshTokenHash");

  if (!user) {
    throw new UnauthorizedError(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const passwordMatches = await comparePassword(
    payload.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new UnauthorizedError(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const accessToken = generateAccessToken({
    userId: user._id,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  const refreshTokenHash = await hashPassword(refreshToken);

  Object.assign(user, {
    refreshTokenHash,
    refreshTokenExpiresAt: getRefreshTokenExpiryDate(),
    lastLoginAt: new Date(),
  });

  await user.save();

  logger.info({
    message: "User authenticated successfully.",
    userId: user._id,
    email: user.email,
  });

  const tokens = {
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: config.jwt.expiresIn,
  };

  return toAuthResponse(user, tokens);
};

module.exports = {
  login,
};
