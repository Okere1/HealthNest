const Appointment = require("./appointment.model");

const createAppointment = (payload) => {
  return Appointment.create(payload);
};

const findAppointments = (filter, options = {}) => {
  return Appointment.find(filter)
    .sort({ appointmentDate: 1 })
    .skip(options.skip || 0)
    .limit(options.limit || 10);
};

const countAppointments = (filter) => {
  return Appointment.countDocuments(filter);
};

const updateAppointment = (appointment, payload) => {
  Object.assign(appointment, payload);
  return appointment.save();
};

const deleteAppointment = (appointment) => {
  return appointment.deleteOne();
};

module.exports = {
  createAppointment,
  findAppointments,
  countAppointments,
  updateAppointment,
  deleteAppointment,
};
