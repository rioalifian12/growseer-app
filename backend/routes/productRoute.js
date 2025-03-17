const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");
const { logger } = require("../middleware/logger");
const { authUser } = require("../middleware/authMiddleware");
const { isInventory } = require("../middleware/checkRole");

router.get("/", logger, getProducts);
router.get("/:id", logger, getProductById);
router.post(
  "/",
  upload.single("imageUrl"),
  authUser,
  isInventory,
  logger,
  createProduct
);
router.patch(
  "/:id",
  upload.single("imageUrl"),
  authUser,
  isInventory,
  logger,
  updateProduct
);
router.delete("/:id", authUser, isInventory, logger, deleteProduct);

module.exports = router;
