const express = require("express");
const {
  getUserDetails,
  getUserDetailById,
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
} = require("../controllers/userDetailController");
const validateUser = require("../middleware/userValidation");
const { authUser } = require("../middleware/authMiddleware");
const { isSales } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

const router = express.Router();

router.get("/", authUser, isSales, logger, getUserDetails);
router.get("/:id", authUser, logger, getUserDetailById);
router.post("/", authUser, logger, createUserDetail);
router.patch("/:id", authUser, validateUser, logger, updateUserDetail);
router.delete("/:id", authUser, isSales, logger, deleteUserDetail);

module.exports = router;
