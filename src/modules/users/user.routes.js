const express = require("express");
const validate = require("../../common/middlewares/validate");
const { registerSchema } = require("./user.validation");
const userController = require("./user.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);

module.exports = router;
