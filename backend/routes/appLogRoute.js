const express = require("express");
const router = express.Router();
const { getAppLog, getAppLogById } = require("../controllers/appLogController");
const { authUser } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

router.get("/", logger, authUser, isAdmin, getAppLog);
router.get("/:id", logger, authUser, isAdmin, getAppLogById);

module.exports = router;
