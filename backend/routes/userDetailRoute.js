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

router.get("/", logger, authUser, isSales, getUserDetails);
router.get("/:id", logger, authUser, getUserDetailById);
router.post("/", logger, authUser, createUserDetail);
router.patch("/:id", logger, authUser, validateUser, updateUserDetail);
router.delete("/:id", logger, authUser, isSales, deleteUserDetail);

module.exports = router;
