const { toPublicUser } = require("../users/user.mapper");

const toAuthResponse = (user, tokens) => ({
  user: toPublicUser(user),
  tokens,
});

module.exports = {
  toAuthResponse,
};
