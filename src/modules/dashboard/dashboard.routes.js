const express = require("express");

const router = express.Router();

const dashboardController = require("./dashboard.controller");
const authenticate = require("../../common/middlewares/authenticate");

/**
 * Get Dashboard Summary
 *
 * Returns a summary of the authenticated user's
 * medications, reminders, appointments and recent activities.
 */
router.get("/", authenticate, dashboardController.getDashboard);

module.exports = router;
