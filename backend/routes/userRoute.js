const express = require("express");
const {
  getUsers,
  getUserById,
  register,
  login,
  logout,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/userController");
const validateUser = require("../middleware/userValidation");
const { authUser } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/checkRole");
const { logger } = require("../middleware/logger");

const router = express.Router();

router.get("/", authUser, isAdmin, logger, getUsers);
router.get("/:id", authUser, logger, getUserById);
router.post("/register", validateUser, logger, register);
router.post("/login", logger, login);
router.post("/logout", authUser, logger, logout);
router.patch("/:id", authUser, validateUser, logger, updateUser);
router.patch("/password/:id", authUser, logger, updatePassword);
router.delete("/:id", authUser, isAdmin, logger, deleteUser);

module.exports = router;
