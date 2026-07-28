const reminderRepository = require("./reminder.repository");
const Reminder = require("./reminder.model");

const getPagination = require("../../common/utils/pagination");
const {
  findUserOwnedResource,
} = require("../../common/utils/resourceOwnership");

const Medication = require("../medications/medication.model");
const Appointment = require("../appointments/appointment.model");

const { NotFoundError } = require("../../common/errors");

/**
 * Create Reminder
 */
const createReminder = async (userId, payload) => {
  let resource;

  if (payload.type === "Medication") {
    resource = await Medication.findOne({
      _id: payload.referenceId,
      user: userId,
    });

    if (!resource) {
      throw new NotFoundError("Medication not found.");
    }
  }

  if (payload.type === "Appointment") {
    resource = await Appointment.findOne({
      _id: payload.referenceId,
      user: userId,
    });

    if (!resource) {
      throw new NotFoundError("Appointment not found.");
    }
  }

  return reminderRepository.createReminder({
    ...payload,
    user: userId,
  });
};

/**
 * Get All User Reminders
 */
const getReminders = async (userId, query) => {
  const { skip, limit } = getPagination(query);

  const reminders = await reminderRepository.findReminders(
    { user: userId },
    {
      skip,
      limit,
    },
  );

  const total = await reminderRepository.countReminders({
    user: userId,
  });

  return {
    reminders,
    pagination: {
      total,
      page: Number(query.page) || 1,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get Reminder By Id
 */
const getReminderById = async (reminderId, userId) => {
  return findUserOwnedResource(Reminder, reminderId, userId, "Reminder");
};

/**
 * Update Reminder
 */
const updateReminder = async (reminderId, userId, payload) => {
  const reminder = await findUserOwnedResource(
    Reminder,
    reminderId,
    userId,
    "Reminder",
  );

  return reminderRepository.updateReminder(reminder, payload);
};

/**
 * Delete Reminder
 */
const deleteReminder = async (reminderId, userId) => {
  const reminder = await findUserOwnedResource(
    Reminder,
    reminderId,
    userId,
    "Reminder",
  );

  await reminderRepository.deleteReminder(reminder);
};

/**
 * Trigger Reminder
 *
 * Called by the mobile app when
 * the notification actually fires.
 */
const triggerReminder = async (reminderId, userId, triggeredAt) => {
  const reminder = await findUserOwnedResource(
    Reminder,
    reminderId,
    userId,
    "Reminder",
  );

  reminder.status = "TRIGGERED";
  reminder.lastTriggeredAt = triggeredAt;

  return reminder.save();
};

const updateReminderStatus = async (reminderId, userId, payload) => {
  const reminder = await findUserOwnedResource(
    Reminder,
    reminderId,
    userId,
    "Reminder",
  );

  reminder.status = payload.status;

  reminder.acknowledgedAt = new Date();

  if (payload.status === "TAKEN") {
    reminder.completedAt = payload.completedAt || new Date();
  }

  return reminder.save();
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
