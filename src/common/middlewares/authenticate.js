const User = require("../../modules/users/user.model");
const { verifyAccessToken } = require("../auth/jwt");
const { UnauthorizedError, ForbiddenError } = require("../errors");
const { USER_STATUS } = require("../../modules/users/user.constants");

const authenticate = async (req, res, next) => {
  try {
    /**
     * =========================================== 
     * Authorization Header
     * ===========================================
     */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header is required.");
    }

    /**
     * ===========================================
     * Bearer Token Format
     * ===========================================
     */
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization format.");
    }

    /**
     * ===========================================
     * Verify JWT
     * ===========================================
     */
    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired access token.");
    }

    /**
     * ===========================================
     * Validate Token Type
     * ===========================================
     */
    if (payload.type !== "access") {
      throw new UnauthorizedError("Invalid access token.");
    }

    /**
     * ===========================================
     * Load User
     * ===========================================
     */
    const user = await User.findById(payload.sub).select(
      "-password -refreshTokenHash",
    );

    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    /**
     * ===========================================
     * Account Status
     * ===========================================
     */
    if (user.status !== USER_STATUS.ACTIVE) {
      throw new ForbiddenError("Account is not active.");
    }

    /**
     * ===========================================
     * Attach User
     * ===========================================
     */
    req.user = user;

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
