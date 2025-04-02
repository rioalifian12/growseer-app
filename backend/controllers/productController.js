const fs = require("fs");
const { Product, InventoryFlow } = require("../models");
const { validate: isUUID } = require("uuid");
const path = require("path");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    if (products.length <= 0) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      pricePerCarton,
      pricePerBox,
      stockCarton,
      boxPerCarton,
      unitType,
      description,
    } = req.body;

    const validUnitTypes = ["carton", "box"];
    if (unitType && !validUnitTypes.includes(unitType)) {
      return res.status(400).json({
        message: "Invalid unitType",
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await Product.create({
      name,
      pricePerBox,
      pricePerCarton,
      stockCarton,
      boxPerCarton,
      unitType,
      description,
      imageUrl,
    });

    if (stockCarton > 0) {
      await InventoryFlow.create({
        productId: product.id,
        type: "in",
        quantity: stockCarton,
        description: `Stok awal ditambahkan ${stockCarton} karton`,
      });
    }

    res.status(201).json({
      message: "Create product successfully!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const {
      name,
      pricePerBox,
      pricePerCarton,
      stockCarton,
      boxPerCarton,
      unitType,
      description,
    } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const validUnitTypes = ["carton", "box"];
    if (unitType && !validUnitTypes.includes(unitType)) {
      return res.status(400).json({
        message: "Invalid unitType",
      });
    }

    // Simpan gambar baru atau tetap gunakan yang lama
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : product.imageUrl;

    // Hapus gambar lama jika ada dan gambar baru diunggah
    if (req.file && product.imageUrl) {
      const oldImagePath = path.join(__dirname, "..", product.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Hitung perubahan stok
    const stockChange = stockCarton - product.stockCarton;
    const type = stockChange > 0 ? "in" : stockChange < 0 ? "out" : null;

    product.name = name || product.name;
    product.pricePerCarton = pricePerCarton || product.pricePerCarton;
    product.pricePerBox = pricePerBox || product.pricePerBox;
    product.stockCarton = stockCarton || product.stockCarton;
    product.boxPerCarton = boxPerCarton || product.boxPerCarton;
    product.unitType = unitType || product.unitType;
    product.description = description || product.description;
    product.imageUrl = imageUrl;

    await product.save();

    // Jika stok berubah, catat di InventoryFlow
    if (type) {
      await InventoryFlow.create({
        productId: product.id,
        type,
        quantity: Math.abs(stockChange),
        description: `Stok ${type} sebanyak ${Math.abs(stockChange)}`,
      });
    }
    res.status(200).json({
      message: "Update product successfully!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Hapus gambar jika ada
    if (product.imageUrl) {
      const imageFileName = path.basename(product.imageUrl);
      const imagePath = path.join(__dirname, "..", "uploads", imageFileName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json({ message: "Delete product successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
