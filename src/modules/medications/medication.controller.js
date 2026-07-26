const ApiResponse = require("../../common/utils/apiResponse");
const medicationService = require("./medication.service.js");

const createMedication = async (req, res, next) => {
  try {
    const medication = await medicationService.createMedication(
      req.user.id,
      req.body,
    );

    return ApiResponse.created(res, {
      message: "Medication created successfully.",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

const getMedications = async (req, res, next) => {
  try {
    const medications = await medicationService.getMedications(
      req.user.id,
      req.query,
    );

    return ApiResponse.success(res, {
      message: "Medications retrieved successfully.",
      data: medications,
    });
  } catch (error) {
    next(error);
  }
};

const getMedicationById = async (req, res, next) => {
  try {
    const medication = await medicationService.getMedicationById(
      req.params.id,
      req.user.id,
    );

    return ApiResponse.success(res, {
      message: "Medication retrieved successfully.",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

const updateMedication = async (req, res, next) => {
  try {
    const medication = await medicationService.updateMedication(
      req.params.id,
      req.user.id,
      req.body,
    );

    return ApiResponse.success(res, {
      message: "Medication updated successfully.",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedication = async (req, res, next) => {
  try {
    await medicationService.deleteMedication(req.params.id, req.user.id);

    return ApiResponse.success(res, {
      message: "Medication deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication,
  deleteMedication,
};
