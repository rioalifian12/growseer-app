const express = require("express");
const {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const validateRole = require("../middleware/roleValidation");

const router = express.Router();

router.get("/", getAllRole);
router.get("/:id", getRoleById);
router.post("/", validateRole, createRole);
router.put("/:id", validateRole, updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
