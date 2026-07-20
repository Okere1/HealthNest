const express = require("express");
const healthRoutes = require("../modules/health");
const { router: userRoutes } = require("../modules/users");
const { router: authRoute } = require("../modules/auth");

const router = express.Router();

router.use(healthRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoute);

module.exports = router;
