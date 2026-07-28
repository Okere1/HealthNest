const dashboardRepository = require("./dashboard.repository");

const getDashboard = async (userId) => {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const [
    activeMedications,
    todayReminders,
    todayAppointments,
    upcomingAppointment,
    recentActivities,
    missedReminders,
    todayReminderList,
  ] = await dashboardRepository.getDashboardData(
    userId,
    startOfToday,
    endOfToday,
    now,
  );

  return {
    summary: {
      activeMedications,
      todayReminders,
      todayAppointments,
      missedReminders,
    },

    upcomingAppointment,

    todayReminderList,

    recentActivities,
  };
};

module.exports = {
  getDashboard,
};
