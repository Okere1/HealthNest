const express = require("express");

const router = express.Router();

const reminderController = require("./reminder.controller");

const authenticate = require("../../common/middlewares/authenticate");
const validate = require("../../common/middlewares/validate");

const {
  createReminderSchema,
  updateReminderSchema,
  triggerReminderSchema,
  updateReminderStatusSchema,
} = require("./reminder.validation");

/**
 * Create Reminder
 */
router.post(
  "/",
  authenticate,
  validate(createReminderSchema),
  reminderController.createReminder,
);

/**
 * Get All Reminders
 */
router.get("/", authenticate, reminderController.getReminders);

/**
 * Get Reminder By Id
 */
router.get("/:id", authenticate, reminderController.getReminderById);

/**
 * Update Reminder
 */
router.patch(
  "/:id",
  authenticate,
  validate(updateReminderSchema),
  reminderController.updateReminder,
);

/**
 * Delete Reminder
 */
router.delete("/:id", authenticate, reminderController.deleteReminder);

/**
 * Trigger Reminder
 *
 * Called by the mobile app after
 * the notification has been displayed.
 */
router.post(
  "/:id/trigger",
  authenticate,
  validate(triggerReminderSchema),
  reminderController.triggerReminder,
);

router.patch(
  "/:id/status",
  authenticate,
  validate(updateReminderStatusSchema),
  reminderController.updateReminderStatus,
);

module.exports = router;
