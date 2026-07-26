const Joi = require("joi");

const createAppointmentSchema = Joi.object({
  hospitalName: Joi.string().trim().max(150).required(),
  doctorSpecialty: Joi.string().trim().max(100).required(),
  doctorName: Joi.string().trim().max(100).optional(),
  appointmentDate: Joi.date().required(),
  appointmentTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
  note: Joi.string().allow("").max(1000).optional(),
  reminderEnabled: Joi.boolean().optional(),
});

const updateAppointmentSchema = Joi.object({
  hospitalName: Joi.string().trim().max(150),
  doctorSpecialty: Joi.string().trim().max(100),
  doctorName: Joi.string().trim().max(100),
  appointmentDate: Joi.date(),
  appointmentTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
  note: Joi.string().allow("").max(1000),
  reminderEnabled: Joi.boolean(),
  status: Joi.string().valid("Upcoming", "Completed", "Cancelled", "Missed"),
}).min(1);

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
};
