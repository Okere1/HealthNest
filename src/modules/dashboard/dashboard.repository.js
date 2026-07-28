const Medication = require("../medications/medication.model");
const Appointment = require("../appointments/appointment.model");
const Reminder = require("../reminders/reminder.model");

const getDashboardData = async (userId, startOfToday, endOfToday, now) => {
  return Promise.all([
    Medication.countDocuments({
      user: userId,
      status: "ACTIVE",
    }),

    Reminder.countDocuments({
      user: userId,
      scheduledAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    Appointment.countDocuments({
      user: userId,
      appointmentDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    Appointment.findOne({
      user: userId,
      appointmentDate: {
        $gte: now,
      },
    }).sort({ appointmentDate: 1 }),

    Reminder.find({
      user: userId,
      type: "Medication",
      status: {
        $in: ["TRIGGERED", "TAKEN"],
      },
    })
      .sort({ updatedAt: -1 })
      .limit(5),

    Reminder.countDocuments({
      user: userId,
      status: "MISSED",
    }),

    // Today's reminder list
    Reminder.find({
      user: userId,
      scheduledAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }).sort({ scheduledAt: 1 }),
  ]);
};

module.exports = {
  getDashboardData,
};
