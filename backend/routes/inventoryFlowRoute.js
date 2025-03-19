const express = require("express");
const router = express.Router();
const {
  getInventoryFlow,
  getInventoryFlowById,
} = require("../controllers/inventoryFlowController");
const { authUser } = require("../middleware/authMiddleware");
const { isInventory } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

router.get("/", logger, authUser, isInventory, getInventoryFlow);
router.get("/:id", logger, authUser, isInventory, getInventoryFlowById);

module.exports = router;
