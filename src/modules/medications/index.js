const controller = require("./medication.controller");
const service = require("./medication.service");
const repository = require("./medication.repository");
const model = require("./medication.model");
const routes = require("./medication.routes");
const validation = require("./medication.validation");

module.exports = {
  controller,
  service,
  repository,
  model,
  routes,
  validation,
};
