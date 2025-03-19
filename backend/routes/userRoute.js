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

router.get("/", logger, authUser, isAdmin, getUsers);
router.get("/:id", logger, authUser, getUserById);
router.post("/register", logger, validateUser, register);
router.post("/login", logger, login);
router.post("/logout", logger, authUser, logout);
router.patch("/:id", logger, authUser, validateUser, updateUser);
router.patch("/password/:id", logger, authUser, updatePassword);
router.delete("/:id", logger, authUser, isAdmin, deleteUser);

module.exports = router;
