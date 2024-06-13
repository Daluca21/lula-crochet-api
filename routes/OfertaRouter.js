const express = require("express");
const router = express.Router();

const ofertaController = require("../controllers/OfertaController");

router
  .get("/", ofertaController.get)
  .get("/:id", ofertaController.getById)
  .post("/", ofertaController.create)
  .put("/:id", ofertaController.update)
  .delete("/:id", ofertaController._delete);

module.exports = router;