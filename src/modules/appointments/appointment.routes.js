const express = require("express");
const router = express.Router();

const authenticate = require("../../common/middlewares/authenticate");
const validate = require("../../common/middlewares/validate");

const appointmentController = require("./appointment.controller");

const {
  createAppointmentSchema,
  updateAppointmentSchema,
} = require("./appointment.validation");

router.post(
  "/",
  authenticate,
  validate(createAppointmentSchema),
  appointmentController.createAppointment,
);

router.get("/", authenticate, appointmentController.getAppointments);

router.get("/:id", authenticate, appointmentController.getAppointmentById);

router.patch(
  "/:id",
  authenticate,
  validate(updateAppointmentSchema),
  appointmentController.updateAppointment,
);

router.delete("/:id", authenticate, appointmentController.deleteAppointment);

module.exports = router;
