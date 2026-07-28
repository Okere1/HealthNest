const ApiResponse = require("../../common/utils/apiResponse");
const dashboardService = require("./dashboard.service");

/**
 * Get Dashboard Summary
 */
const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getDashboard(req.user.id);

    return ApiResponse.success(res, {
      message: "Dashboard retrieved successfully.",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};
