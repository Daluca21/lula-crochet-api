const express = require("express");
const router = express.Router();

const productoController = require("../controllers/ProductoController");

router.get("/:id/ofertas", productoController.getOfertasById);
router.get("/ofertas", productoController.getWithOferta);

router
  .get("/", productoController.get)
  .get("/:id", productoController.getById)
  .get("/categoria/:id", productoController.getByCategoria)
  .post("/", productoController.create)
  .put("/:id", productoController.update)
  .delete("/:id", productoController._delete);

module.exports = router;