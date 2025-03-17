const express = require("express");
const router = express.Router();
const {
  getInventoryFlow,
  getInventoryFlowById,
} = require("../controllers/inventoryFlowController");
const { authUser } = require("../middleware/authMiddleware");
const { isInventory } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

router.get("/", authUser, isInventory, logger, getInventoryFlow);
router.get("/:id", authUser, isInventory, logger, getInventoryFlowById);

module.exports = router;
