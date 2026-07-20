const ApiResponse = require("../../common/utils/apiResponse");
const userService = require("./user.service");

const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);

    return ApiResponse.created(res, {
      message: "Account created successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
