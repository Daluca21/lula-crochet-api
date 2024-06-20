const express = require("express");
const router = express.Router();

const pagoController = require("../controllers/FacturaController.js");

router.post("/crear", pagoController.create);
router.post("/webhook", pagoController.recieveWebhook);

module.exports = router;