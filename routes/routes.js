const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/contacts", controller.get);
router.post("/contacts", controller.create);
router.patch("/contacts/:contactId", controller.update);
router.put("/contacts/:contactId", controller.update);
router.delete("/contacts/:contactId", controller.remove);

module.exports = router;
