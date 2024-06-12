const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/UsuarioController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", usuarioController.register);
router.post("/", verifyToken, usuarioController.create);
router.get("/", verifyToken, usuarioController.get);
router.get("/:id", verifyToken, usuarioController.getById);
router.put("/:id", verifyToken, usuarioController.update);
router.delete("/:id", verifyToken, usuarioController._delete);

module.exports = router;