"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.AppLog, { foreignKey: "userId", as: "logs" });
      User.hasMany(models.Order, { foreignKey: "userId", as: "order" });

      User.hasMany(User, { foreignKey: "referredBy", as: "customers" });
      User.belongsTo(User, { foreignKey: "referredBy", as: "sales" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING(50), allowNull: true },
      phone: { type: DataTypes.STRING(14), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
      latitude: { type: DataTypes.FLOAT, allowNull: true },
      longitude: { type: DataTypes.FLOAT, allowNull: true },
      mapsUrl: { type: DataTypes.STRING, allowNull: true },
      role: {
        type: DataTypes.ENUM("superadmin", "inventory", "sales", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      referralCode: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: true,
      },
      referredBy: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
          model: "Users",
          key: "referralCode",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      sessionExpiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
