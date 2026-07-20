const Joi = require("joi");
const messages = require("./messages");

const commonSchemas = {
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "any.required": messages.REQUIRED("First name"),
      "string.empty": messages.REQUIRED("First name"),
    }),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "any.required": messages.REQUIRED("Last name"),
      "string.empty": messages.REQUIRED("Last name"),
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": messages.INVALID_EMAIL,
      "any.required": messages.REQUIRED("Email"),
      "string.empty": messages.REQUIRED("Email"),
    }),

  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .messages({
      "string.min": messages.PASSWORD_MIN,
      "any.required": messages.REQUIRED("Password"),
      "string.empty": messages.REQUIRED("Password"),
    }),
};

module.exports = commonSchemas;
