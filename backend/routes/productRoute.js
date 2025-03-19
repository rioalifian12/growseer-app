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
const errorHandlerUpload = require("../middleware/errorHandlerUpload");

router.get("/", logger, getProducts);
router.get("/:id", logger, getProductById);
router.post(
  "/",
  logger,
  authUser,
  isInventory,
  upload.single("imageUrl"),
  errorHandlerUpload,
  createProduct
);
router.patch(
  "/:id",
  logger,
  authUser,
  isInventory,
  upload.single("imageUrl"),
  errorHandlerUpload,
  updateProduct
);
router.delete("/:id", logger, authUser, isInventory, deleteProduct);

module.exports = router;
