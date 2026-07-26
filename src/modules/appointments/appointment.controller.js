const ApiResponse = require("../../common/utils/ApiResponse");
const appointmentService = require("./appointment.service");

const createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.createAppointment(
      req.user.id,
      req.body,
    );

    return ApiResponse.created(res, {
      message: "Appointment created successfully.",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAppointments(
      req.user.id,
      req.query,
    );

    return ApiResponse.success(res, {
      message: "Appointments retrieved successfully.",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await appointmentService.getAppointmentById(
      req.params.id,
      req.user.id,
    );

    return ApiResponse.success(res, {
      message: "Appointment retrieved successfully.",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.updateAppointment(
      req.params.id,
      req.user.id,
      req.body,
    );

    return ApiResponse.success(res, {
      message: "Appointment updated successfully.",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    await appointmentService.deleteAppointment(req.params.id, req.user.id);

    return ApiResponse.success(res, {
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
