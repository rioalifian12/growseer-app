"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(14),
    },
    address: {
      type: DataTypes.TEXT,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
    },
    referral_code: {
      type: DataTypes.STRING(50),
    },
    referred_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "Referrals",
        key: "id",
      },
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "roles" });
  };

  return User;
};
