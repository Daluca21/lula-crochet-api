const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/me", verifyToken, loginController.me);
router.post("/login", loginController.login);
router.post("/forgot-password", loginController.solicitarToken);
router.get("/reset/:token", loginController.verificarToken);
router.post("/reset/:token", loginController.cambiarContrasena);

module.exports = router;