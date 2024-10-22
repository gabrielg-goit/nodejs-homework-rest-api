const services = require("../services/services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const getAccount = async (req, res, next) => {
  try {
    const results = await services.getAllAccounts();
    res.json({
      status: "Succes",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await services.createAccount({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "Succes",
      code: 201,
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await services.checkUserDB({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "Succes",
      code: 201,
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const removeAccount = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await services.deleteAccount(contactId);
    res.status(204).json({
      status: "Succes",
      code: 204,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const result = await services.updateAccount(contactId, updateData);
    res.status(201).json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const getContacts = async (req, res, next) => {
  try {
    const result = await services.getAllContacts();
    res.json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const result = await services.addContact({ name, email, phone, favorite });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const result = await services.updateContact(contactId, updateData);
    res.status(201).json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await services.deleteContact(contactId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

module.exports = {
  getAccount,
  createAccount,
  loginAccount,
  removeAccount,
  updateAccount,
  getContacts,
  createContacts,
  updateContacts,
  removeContact,
};
