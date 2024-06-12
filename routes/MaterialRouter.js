const express = require("express");
const router = express.Router();

const materialController = require("../controllers/MaterialController");

router
  .get("/", materialController.get)
  .get("/:id", materialController.getById)
  .post("/", materialController.create)
  .put("/:id", materialController.update)
  .delete("/:id", materialController._delete);

module.exports = router;