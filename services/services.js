const User = require("./schemas/UserModel");

const getAllUsers = async () => {
  return User.find();
};

const createContact = async ({ name, email, phone }) => {
  return User.create({ name, email, phone });
};

const updateContact = async (contactId, updateData) => {
  return User.findByIdAndUpdate(
    { _id: contactId },
    { $set: updateData },
    { new: true }
  );
};

const deleteContact = async (contactId) => {
  return User.deleteOne({ _id: contactId });
};

module.exports = {
  getAllUsers,
  createContact,
  updateContact,
  deleteContact,
};
