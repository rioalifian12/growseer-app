const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const { logger } = require("../middleware/logger");
const { authUser } = require("../middleware/authMiddleware");
const { isCustomer } = require("../middleware/checkRole");

router.post("/", logger, authUser, isCustomer, createOrder);

module.exports = router;
