"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.InventoryFlow, {
        foreignKey: "productId",
        as: "inventoryFlows",
      });
      Product.hasMany(models.OrderDetail, {
        foreignKey: "productId",
        as: "orderDetails",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricePerCarton: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      pricePerBox: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stockCarton: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boxPerCarton: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitType: {
        type: DataTypes.ENUM("carton", "box"),
        allowNull: false,
        defaultValue: "carton",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
