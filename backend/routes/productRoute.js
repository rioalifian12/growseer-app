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

router.post("/", upload.single("imageUrl"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", upload.single("imageUrl"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
