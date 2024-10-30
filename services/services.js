const User = require("./schemas/User");
const Contacts = require("./schemas/Contacts");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const getAllAccounts = async () => {
  return User.find();
};

const logOutAccount = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    user.token = null;
    await user.save();

    return userId;
    // return res.status(204).send();
  } catch (error) {
    throw error;
  }
};

const createAccount = async ({ email, password }) => {
  try {
    const userExistent = await User.findOne({ email });
    if (userExistent) {
      throw new Error("Aceste email exista deja!");
    }

    const newUser = User({ email });
    newUser.setPassword(password);

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        _id: savedUser._id,
        email: savedUser.email,
      },
      secret,
      { expiresIn: "1h" }
    );
    savedUser.token = token;

    return await savedUser.save();
  } catch (error) {
    throw error;
  }
};

const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email sau parola gresita!");
    }
    // if (!user) {
    //   throw new Error("Aceste email nu exista!");
    // }
    // if (user.password !== password) {
    //   throw new Error("Aceasta parola nu exista!");
    // }

    const token = jwt.sign({ _id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    user.token = token;

    return await user.save();
    // return user;
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (contactId, updatedData) => {
  try {
    return User.findByIdAndUpdate(
      { _id: contactId },
      { $set: updatedData },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (contactId) => {
  try {
    return User.deleteOne({ _id: contactId });
  } catch (error) {
    throw error;
  }
};

// const getAllContacts = async () => {
//   return Contacts.find();
// };

const getAllContacts = async (ownerId) => {
  try {
    return Contacts.find({ owner: ownerId });
  } catch (error) {
    throw error;
  }
};

// const addContact = async ({ name, email, phone, favorite }) => {
//   return Contacts.create({ name, email, phone, favorite });
// };

const addContact = async ({ name, email, phone, ownerId }) => {
  try {
    const contact = new Contacts({
      name,
      email,
      phone,
      owner: ownerId,
    });
    await contact.save();

    return contact;
  } catch (error) {
    throw error;
  }
};

// const updateContact = async (contactId, updatedData) => {
//   return Contacts.findByIdAndUpdate(
//     { _id: contactId },
//     { $set: updatedData },
//     { new: true }
//   );
// };

const updateContact = async (contactId, updatedData, ownerId) => {
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error(
        "Contact not found or you don't have permission to update"
      );
    }

    return updatedContact;
  } catch (error) {
    throw error;
  }
};

// const deleteContact = async (contactId) => {
//   return Contacts.deleteOne({ _id: contactId });
// };

const deleteContact = async (contactId, ownerId) => {
  try {
    const deletedContact = await Contacts.deleteOne({
      _id: contactId,
      owner: ownerId,
    });

    if (deletedContact.deletedCount === 0) {
      throw new Error(
        "Contact not found or you don't have permission to delete"
      );
    }

    return deletedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAccounts,
  createAccount,
  checkUserDB,
  updateAccount,
  logOutAccount,
  deleteAccount,
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
};
