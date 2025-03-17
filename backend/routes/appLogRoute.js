const express = require("express");
const router = express.Router();
const { getAppLog, getAppLogById } = require("../controllers/appLogController");
const { authUser } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

router.get("/", authUser, isAdmin, logger, getAppLog);
router.get("/:id", authUser, isAdmin, logger, getAppLogById);

module.exports = router;
