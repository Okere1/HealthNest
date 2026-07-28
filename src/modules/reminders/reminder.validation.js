const Joi = require("joi");

const createReminderSchema = Joi.object({
  type: Joi.string().valid("Medication", "Appointment").required(),
  referenceId: Joi.string().required(),
  title: Joi.string().max(100).required(),
  message: Joi.string().allow("").max(500),
  scheduledAt: Joi.date().required(),
  repeat: Joi.string().valid("NONE", "DAILY", "WEEKLY", "MONTHLY", "CUSTOM"),
  enabled: Joi.boolean(),
});

const updateReminderSchema = Joi.object({
  title: Joi.string().max(100),
  message: Joi.string().allow("").max(500),
  scheduledAt: Joi.date(),
  repeat: Joi.string().valid("NONE", "DAILY", "WEEKLY", "MONTHLY", "CUSTOM"),
  enabled: Joi.boolean(),
  status: Joi.string().valid("PENDING", "TRIGGERED", "MISSED", "CANCELLED"),
}).min(1);

const triggerReminderSchema = Joi.object({
  triggeredAt: Joi.date().required(),
});

const updateReminderStatusSchema = Joi.object({
  status: Joi.string().valid("TAKEN", "SKIPPED", "MISSED").required(),

  completedAt: Joi.date().optional(),
});

module.exports = {
  createReminderSchema,
  updateReminderSchema,
  triggerReminderSchema,
  updateReminderStatusSchema,
};
