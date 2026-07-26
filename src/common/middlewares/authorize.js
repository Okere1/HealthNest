const { ForbiddenError } = require("../errors");

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("Authentication is required."));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError("You are not authorized to perform this action."),
      );
    }

    next();
  };

module.exports = authorize;
