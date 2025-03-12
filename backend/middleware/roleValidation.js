const { body, validationResult } = require("express-validator");
const { Role } = require("../models");

const validateRole = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty!")
    .custom(async (name, { req }) => {
      const { id } = req.params;
      // Jika update, cari data berdasarkan ID
      if (id) {
        const role = await Role.findByPk(id);
        if (!role) {
          throw new Error("Role not found!");
        }
        // Jika nama yang dikirimkan sama dengan yang ada di database, lewati validasi
        if (role.name === name) {
          return true;
        }
      }
      const existRole = await Role.findOne({ where: { name } });
      // kembalikan error jika nama yang diinput sama dengan nama yang ada di storage
      if (existRole) {
        throw new Error("Name already exists");
      }
    }),
  (req, res, next) => {
    const result = validationResult(req);
    // jika result validasi true maka kirimkan validasi error
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.array(),
      });
    }
    next();
  },
];

module.exports = validateRole;
