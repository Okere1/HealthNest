const ApiResponse = require("../../common/utils/apiResponse");
const authService = require("./auth.service");
const { AUTH_MESSAGES } = require("./auth.constants");

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return ApiResponse.success(res, {
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
