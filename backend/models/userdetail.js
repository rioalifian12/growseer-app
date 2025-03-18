"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetail.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  UserDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: { type: DataTypes.STRING(50), allowNull: true },
      phone: { type: DataTypes.STRING(14), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "UserDetail",
    }
  );
  return UserDetail;
};
