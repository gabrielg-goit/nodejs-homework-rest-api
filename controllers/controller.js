const services = require("../services/services");

const get = async (req, res, next) => {
  try {
    const results = await services.getAllUsers();
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
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await services.createContact({ name, email, phone });
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

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await services.deleteContact(contactId);
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

const update = async (req, res, next) => {
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
      status: "Error",
      code: 404,
    });
  }
};

module.exports = {
  get,
  create,
  remove,
  update,
};
