const config = require("../../config");

const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Personal Health Companion API is running",
    data: {
      status: "OK",
      version: "v1",
      environment: config.env,
      timestamp: new Date().toISOString(),
    },
    errors: null,
  });
};

module.exports = {
  getHealth,
};
