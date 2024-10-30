const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/uploads", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "Lipsa fisier de incarcat!" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal sever error!" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Aplciatia ruleaza pe portul ${PORT}`);
});
