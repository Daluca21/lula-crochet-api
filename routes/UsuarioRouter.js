const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/UsuarioController");
const verifyToken = require("../middlewares/verifyToken");
const onlyAdmins = require("../middlewares/onlyAdmins");

router.post("/register", usuarioController.register);
router.get("/", verifyToken, usuarioController.get);
router.get("/:id", verifyToken, usuarioController.getById);
router.put("/:id", verifyToken, usuarioController.update);
router.post("/", onlyAdmins, verifyToken, usuarioController.create);
router.delete("/:id", onlyAdmins, verifyToken, usuarioController._delete);

module.exports = router;