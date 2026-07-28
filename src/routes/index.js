const express = require("express");
const healthRoutes = require("../modules/health");
const { router: userRoutes } = require("../modules/users");
const { router: authRoute } = require("../modules/auth");
const medicationRoutes = require("../modules/medications");
const appointmentRoutes = require("../modules/appointments");
const reminderRoutes = require("../modules/reminders");

const router = express.Router();

router.use(healthRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoute);
router.use("/medications", medicationRoutes.routes);
router.use("/appointments", appointmentRoutes.routes);
router.use("/reminders", reminderRoutes.routes);

module.exports = router;
