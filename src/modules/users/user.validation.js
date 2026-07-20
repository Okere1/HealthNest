const Joi = require("joi");
const common = require("../../common/validators/commonSchemas");

const registerSchema = Joi.object({
  firstName: common.firstName,
  lastName: common.lastName,
  email: common.email,
  password: common.password,
});

module.exports = {
  registerSchema,
};
