"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = bcrypt.hashSync("5up3r4dm1n", 10);
    await queryInterface.bulkInsert("Users", [
      {
        name: "Superadmin",
        email: "superadmin@example.com",
        password: hash,
        phone: "081234567890",
        address: "Jl. Admin No.1",
        role_id: 1,
        referral_code: "ADMIN123",
        referred_by: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
