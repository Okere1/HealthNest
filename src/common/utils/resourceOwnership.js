const { NotFoundError } = require("../errors");

/**
 * Finds a resource belonging to the authenticated user.
 *
 * @param {Model} model - Mongoose model
 * @param {String} resourceId
 * @param {String} userId
 * @param {String} resourceName
 * @returns Document
 */
const findUserOwnedResource = async (
  model,
  resourceId,
  userId,
  resourceName = "Resource",
) => {
  const resource = await model.findOne({
    _id: resourceId,
    user: userId,
  });

  if (!resource) {
    throw new NotFoundError(`${resourceName} not found.`);
  }

  return resource;
};

module.exports = {
  findUserOwnedResource,
};
