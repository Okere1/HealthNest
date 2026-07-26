const Joi = require("joi");

const createMedicationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  dosage: Joi.string().trim().max(50).required(),

  frequency: Joi.string()
    .valid(
      "Once Daily",
      "Twice Daily",
      "Three Times Daily",
      "Weekly",
      "Monthly",
      "Custom",
    )
    .optional(),

  reminderTime: Joi.array()
    .items(Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/))
    .min(1)
    .optional(),

  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).optional(),
  instructions: Joi.string().allow("").max(500).optional(),
  status: Joi.string().valid("Active", "Completed", "Paused").optional(),
});

const updateMedicationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  dosage: Joi.string().trim().max(50),
  frequency: Joi.string().valid(
    "Once Daily",
    "Twice Daily",
    "Three Times Daily",
    "Weekly",
    "Monthly",
    "Custom",
  ),
  reminderTime: Joi.array().items(
    Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
  ),
  startDate: Joi.date(),
  endDate: Joi.date(),
  instructions: Joi.string().allow("").max(500),
  status: Joi.string().valid("Active", "Completed", "Paused"),
}).min(1);

module.exports = {
  createMedicationSchema,
  updateMedicationSchema,
};
