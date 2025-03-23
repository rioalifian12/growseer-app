"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(14),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("superadmin", "inventory", "sales", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      referralCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        unique: true,
      },
      referredBy: {
        type: Sequelize.STRING(10),
        allowNull: true,
        references: {
          model: "Users",
          key: "referralCode",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      sessionExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
