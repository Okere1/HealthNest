const express = require("express");
const router = express.Router();

const medicationController = require("./medication.controller");
const authenticate = require("../../common/middlewares/authenticate");
const authorize = require("../../common/middlewares/authorize");
const validate = require("../../common/middlewares/validate");
const {
  createMedicationSchema,
  updateMedicationSchema,
} = require("./medication.validation");

router.post(
  "/",
  authenticate,
  // authorize("user"),
  validate(createMedicationSchema),
  medicationController.createMedication,
);

router.get(
  "/",
  authenticate,
  // authorize("user"),
  medicationController.getMedications,
);

router.get(
  "/:id",
  authenticate,
  // authorize("user"),
  medicationController.getMedicationById,
);

router.patch(
  "/:id",
  authenticate,
  // authorize("user"),
  validate(updateMedicationSchema),
  medicationController.updateMedication,
);

router.delete(
  "/:id",
  authenticate,
  // authorize("user"),
  medicationController.deleteMedication,
);

module.exports = router;
