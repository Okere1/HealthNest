const medicationRepository = require("./medication.repository");
const getPagination = require("../../common/utils/pagination");
const {
  findUserOwnedResource,
} = require("../../common/utils/resourceOwnership");
const Medication = require("./medication.model");

const createMedication = async (userId, payload) => {
  return medicationRepository.createMedication({
    ...payload,
    user: userId,
  });
};

const getMedications = async (userId, query) => {
  const { skip, limit } = getPagination(query);

  const medications = await medicationRepository.findMedications(
    { user: userId },
    {
      skip,
      limit,
    },
  );

  const total = await medicationRepository.countMedications({
    user: userId,
  });

  return {
    medications,
    pagination: {
      total,
      page: Number(query.page) || 1,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getMedicationById = async (medicationId, userId) => {
  return findUserOwnedResource(Medication, medicationId, userId, "Medication");
};

const updateMedication = async (medicationId, userId, payload) => {
  const medication = await findUserOwnedResource(
    Medication,
    medicationId,
    userId,
    "Medication",
  );

  return medicationRepository.updateMedication(medication, payload);
};

const deleteMedication = async (medicationId, userId) => {
  const medication = await findUserOwnedResource(
    Medication,
    medicationId,
    userId,
    "Medication",
  );

  await medicationRepository.deleteMedication(medication);
};

module.exports = {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication,
  deleteMedication,
};
