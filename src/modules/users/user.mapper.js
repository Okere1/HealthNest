const toPublicUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  status: user.status,
  createdAt: user.createdAt,
});

module.exports = {
  toPublicUser, 
};
 