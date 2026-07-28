const ApiResponse = require("../../common/utils/apiResponse");
const reminderService = require("./reminder.service");

/**
 * Create Reminder
 */
const createReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.createReminder(
      req.user.id,
      req.body,
    );

    return ApiResponse.created(res, {
      message: "Reminder created successfully.",
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get User Reminders
 */
const getReminders = async (req, res, next) => {
  try {
    const reminders = await reminderService.getReminders(
      req.user.id,
      req.query,
    );

    return ApiResponse.success(res, {
      message: "Reminders retrieved successfully.",
      data: reminders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Reminder By Id
 */
const getReminderById = async (req, res, next) => {
  try {
    const reminder = await reminderService.getReminderById(
      req.params.id,
      req.user.id,
    );

    return ApiResponse.success(res, {
      message: "Reminder retrieved successfully.",
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Reminder
 */
const updateReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.updateReminder(
      req.params.id,
      req.user.id,
      req.body,
    );

    return ApiResponse.success(res, {
      message: "Reminder updated successfully.",
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Reminder
 */
const deleteReminder = async (req, res, next) => {
  try {
    await reminderService.deleteReminder(req.params.id, req.user.id);

    return ApiResponse.success(res, {
      message: "Reminder deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Trigger Reminder
 *
 * Called by the mobile application
 * after the local notification fires.
 */
const triggerReminder = async (req, res, next) => {
  try {
    const reminder = await reminderService.triggerReminder(
      req.params.id,
      req.user.id,
      req.body.triggeredAt,
    );

    return ApiResponse.success(res, {
      message: "Reminder marked as triggered.",
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

const updateReminderStatus = async (req, res, next) => {
  try {
    const reminder = await reminderService.updateReminderStatus(
      req.params.id,
      req.user.id,
      req.body,
    );

    return ApiResponse.success(res, {
      message: "Reminder status updated successfully.",
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  triggerReminder,
  updateReminderStatus,
};
