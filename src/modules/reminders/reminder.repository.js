const Reminder = require("./reminder.model");

const createReminder = (payload) => Reminder.create(payload);

const findReminderById = (id) => Reminder.findById(id);

const findReminders = (filter, options = {}) =>
  Reminder.find(filter)
    .skip(options.skip || 0)
    .limit(options.limit || 10)
    .sort({ scheduledAt: 1 });

const countReminders = (filter) => Reminder.countDocuments(filter);

const updateReminder = (reminder, payload) => {
  Object.assign(reminder, payload);
  return reminder.save();
};

const deleteReminder = (reminder) => reminder.deleteOne();

module.exports = {
  createReminder,
  findReminderById,
  findReminders,
  countReminders,
  updateReminder,
  deleteReminder,
};
