const express = require("express");
const router = express.Router();
const {
  getAccount,
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getContacts,
  createContacts,
  updateContacts,
  removeContact,
  getCurrentUser,
  uploadAvatar,
} = require("../controllers/controler");
const { auth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.patch("/account/avatars", auth, upload.single("avatar"), uploadAvatar);

router.get("/account", getAccount);
router.get("/account/current", auth, getCurrentUser);
router.get("/account/logout", auth, logOutAccount);
router.post("/account/register", createAccount);
router.post("/account/login", loginAccount);
router.put("/account/:contactId", auth, updateAccount);
router.delete("/account/:contactId", auth, removeAccount);

router.get("/contacts", auth, getContacts);
router.post("/contacts", auth, createContacts);
router.put("/contacts/:contactId", auth, updateContacts);
router.delete("/contacts/:contactId", auth, removeContact);

module.exports = router;
