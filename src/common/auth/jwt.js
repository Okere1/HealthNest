const jwt = require("jsonwebtoken");
const config = require("../../config");
const ms = require("ms");

const signToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

/**
 * ===========================================
 * Generate Access Token
 * ===========================================
 */
const generateAccessToken = ({ userId }) =>
  signToken(
    {
      sub: userId,
      type: "access",
    },
    config.jwt.secret,
    config.jwt.expiresIn,
  );

/**
 * ===========================================
 * Generate Refresh Token
 * ===========================================
 */
const generateRefreshToken = ({ userId }) =>
  signToken(
    {
      sub: userId,
      type: "refresh",
    },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn,
  );

/**
 * ===========================================
 * Verify Access Token
 * ===========================================
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

/**
 * ===========================================
 * Verify Refresh Token
 * ===========================================
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

const getRefreshTokenExpiryDate = () => {
  return new Date(Date.now() + ms(config.jwt.refreshExpiresIn));
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  getRefreshTokenExpiryDate,
};
