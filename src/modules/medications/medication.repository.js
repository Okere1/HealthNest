const Medication = require("./medication.model");

/**
 * Create Medication
 */
const createMedication = (payload) => {
  return Medication.create(payload);
};

/**
 * Find Medications
 */
const findMedications = (filter = {}, options = {}) => {
  return Medication.find(filter)
    .sort({ createdAt: -1 })
    .skip(options.skip || 0)
    .limit(options.limit || 10);
};

/**
 * Count Medications
 */
const countMedications = (filter = {}) => {
  return Medication.countDocuments(filter);
};

/**
 * Update Medication
 */
const updateMedication = async (medication, payload) => {
  Object.assign(medication, payload);
  return medication.save();
};

/**
 * Delete Medication
 */
const deleteMedication = (medication) => {
  return medication.deleteOne();
};

module.exports = {
  createMedication,
  findMedications,
  countMedications,
  updateMedication,
  deleteMedication,
};
