const Appointment = require("./appointment.model");
const appointmentRepository = require("./appointment.repository");

const getPagination = require("../../common/utils/pagination");
const {
  findUserOwnedResource,
} = require("../../common/utils/resourceOwnership");

const createAppointment = async (userId, payload) => {
  return appointmentRepository.createAppointment({
    ...payload,
    user: userId,
  });
};

const getAppointments = async (userId, query) => {
  const { skip, limit } = getPagination(query);

  const appointments = await appointmentRepository.findAppointments(
    { user: userId },
    { skip, limit },
  );

  const total = await appointmentRepository.countAppointments({
    user: userId,
  });

  return {
    appointments,
    pagination: {
      total,
      page: Number(query.page) || 1,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getAppointmentById = async (appointmentId, userId) => {
  return findUserOwnedResource(
    Appointment,
    appointmentId,
    userId,
    "Appointment",
  );
};

const updateAppointment = async (appointmentId, userId, payload) => {
  const appointment = await findUserOwnedResource(
    Appointment,
    appointmentId,
    userId,
    "Appointment",
  );

  return appointmentRepository.updateAppointment(appointment, payload);
};

const deleteAppointment = async (appointmentId, userId) => {
  const appointment = await findUserOwnedResource(
    Appointment,
    appointmentId,
    userId,
    "Appointment",
  );

  await appointmentRepository.deleteAppointment(appointment);
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
