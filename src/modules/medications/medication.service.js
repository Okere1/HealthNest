import * as medicationRepository from "./medication.repository.js";
import getPagination from "../../common/utils/pagination.js";
import { findUserOwnedResource } from "../../common/utils/resourceOwnership.js";
import Medication from "./medication.model.js";

export const createMedication = async (userId, payload) => {
  return medicationRepository.createMedication({
    ...payload,
    user: userId,
  });
};

export const getMedications = async (userId, query) => {
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

export const getMedicationById = async (medicationId, userId) => {
  return findUserOwnedResource(Medication, medicationId, userId, "Medication");
};

export const updateMedication = async (medicationId, userId, payload) => {
  const medication = await findUserOwnedResource(
    Medication,
    medicationId,
    userId,
    "Medication",
  );

  return medicationRepository.updateMedication(medication, payload);
};

export const deleteMedication = async (medicationId, userId) => {
  const medication = await findUserOwnedResource(
    Medication,
    medicationId,
    userId,
    "Medication",
  );

  await medicationRepository.deleteMedication(medication);
};
