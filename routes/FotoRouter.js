const express = require("express");
const router = express.Router();

const fotoController = require("../controllers/FotoController");

router
  .get("/", fotoController.get)
  .get("/:id", fotoController.getById)
  .post("/", fotoController.create)
  .put("/:id", fotoController.update)
  .delete("/:id", fotoController._delete);

module.exports = router;