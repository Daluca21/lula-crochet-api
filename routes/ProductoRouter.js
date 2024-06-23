const express = require("express");
const router = express.Router();

const productoController = require("../controllers/ProductoController");

router.get("/:id/ofertas", productoController.getOfertasById);
router.get("/ofertas", productoController.getWithOferta);


router.get("/", productoController.get);
router.get("/:id", productoController.getById);
router.get("/categoria/:id", productoController.getByCategoria);
router.post("/", productoController.create);
router.put("/:id", productoController.update);
router.delete("/:id", productoController._delete);
router.post("/carrito", productoController.addToCarrito);
router.delete("/carrito/:correo/:id", productoController.removeToCarrito);
router.get("/carrito/:correo", productoController.getCarrito);

module.exports = router;