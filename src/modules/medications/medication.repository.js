import Medication from "./medication.model.js";

export const createMedication = async (payload) => {
  return Medication.create(payload);
};

export const findMedicationById = async (id) => {
  return Medication.findById(id);
};

export const findMedication = async (filter) => {
  return Medication.findOne(filter);
};

export const findMedications = async (
  filter,
  { skip = 0, limit = 10, sort = { createdAt: -1 } } = {},
) => {
  return Medication.find(filter).sort(sort).skip(skip).limit(limit);
};

export const updateMedication = async (medication, payload) => {
  medication.set(payload);
  return medication.save();
};

export const deleteMedication = async (medication) => {
  return medication.deleteOne();
};

export const countMedications = async (filter) => {
  return Medication.countDocuments(filter);
};
