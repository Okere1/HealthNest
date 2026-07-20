const express = require("express");
const validate = require("../../common/middlewares/validate");
const authenticate = require("../../common/middlewares/authenticate");
const ApiResponse = require("../../common/utils/apiResponse");
const { loginSchema } = require("./auth.validation");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

router.get("/me", authenticate, (req, res) => {
  return ApiResponse.success(res, {
    message: "Authenticated successfully.",
    data: req.user,
  });
});

module.exports = router; 
