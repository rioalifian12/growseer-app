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

const router = express.Router();

router.get("/", authUser, getUsers);
router.get("/:id", authUser, getUserById);
router.post("/register", validateUser, register);
router.post("/login", login);
router.post("/logout", authUser, logout);
router.patch("/:id", authUser, isAdmin, validateUser, updateUser);
router.patch("/password/:id", authUser, updatePassword);
router.delete("/:id", authUser, isAdmin, deleteUser);

module.exports = router;
