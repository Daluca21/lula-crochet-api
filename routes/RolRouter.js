const express = require("express");
const router = express.Router();

const rolController = require("../controllers/RolController");
const verifyToken = require("../middlewares/verifyToken");
const onlyAdmins = require("../middlewares/onlyAdmins");

router
  .get("/", rolController.get)
  .get("/:id", rolController.getById)
  .post("/", onlyAdmins, verifyToken, rolController.create)
  .put("/:id", onlyAdmins, verifyToken, rolController.update)
  .delete("/:id", onlyAdmins, verifyToken, rolController._delete);

module.exports = router;