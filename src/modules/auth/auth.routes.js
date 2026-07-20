const express = require("express");
const validate = require("../../common/middlewares/validate");
const { loginSchema } = require("./auth.validation");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
