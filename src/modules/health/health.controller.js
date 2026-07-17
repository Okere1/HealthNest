const config = require("../../config");
const ApiResponse = require("../../common/utils/apiResponse");

exports.getHealth = (req, res) => {
  return ApiResponse.success(res, {
    message: "Personal Health Companion API is running",
    data: {
      status: "OK",
      version: "v1",
      environment: config.env,
    },
  });
};
