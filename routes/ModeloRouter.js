const express = require("express");
const { upload } = require('../config/multer');
const router = express.Router();

const modeloController = require("../controllers/ModeloController");

router
  .get("/", modeloController.get)
  .get("/:id", modeloController.getById)
  .post("/", upload.array("imagenes", 5), modeloController.create)
  .put("/:id", upload.array("imagenes", 5), modeloController.update)
  .delete("/:id", modeloController._delete);

module.exports = router;