const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrdersById,
  updateOrder,
} = require("../controllers/orderController");
const { logger } = require("../middleware/logger");
const { authUser } = require("../middleware/authMiddleware");
const { isCustomer, isSales } = require("../middleware/checkRole");

router.post("/", logger, authUser, isCustomer, createOrder);
router.get("/", logger, authUser, getOrders);
router.get("/:id", logger, authUser, getOrdersById);
router.patch("/:id", logger, authUser, isSales, updateOrder);

module.exports = router;
