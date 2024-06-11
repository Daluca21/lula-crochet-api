const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/CategoriaController");

router
  .get("/", categoriaController.get)
  .get("/:id", categoriaController.getById)
  .post("/", categoriaController.create)
  .put("/:id", categoriaController.update)
  .delete("/:id", categoriaController._delete);

module.exports = router;