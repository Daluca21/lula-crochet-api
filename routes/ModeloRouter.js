const express = require("express");
const router = express.Router();

const modeloController = require("../controllers/ModeloController");

router
  .get("/", modeloController.get)
  .get("/:id", modeloController.getById)
  .post("/", modeloController.create)
  .put("/:id", modeloController.update)
  .delete("/:id", modeloController._delete);

module.exports = router;