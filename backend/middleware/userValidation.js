const { body, validationResult } = require("express-validator");
const { User } = require("../models");

const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty!")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .custom(async (name, { req }) => {
      const { id } = req.params;
      if (id) {
        const user = await User.findByPk(id);
        name = user.name;

        if (name === user.name) {
          return true;
        }
      }
    })
    .optional(),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty!")
    .isEmail()
    .withMessage("Invalid email format!")
    .custom(async (email, { req }) => {
      const { id } = req.params;
      if (id) {
        const user = await User.findByPk(id);
        email = user.email;

        if (email === user.email) {
          return true;
        }
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists!");
      }
    })
    .optional(),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom(async (password, { req }) => {
      const { id } = req.params;
      if (id) {
        const user = await User.findByPk(id);
        password = user.password;

        if (password === user.password) {
          return true;
        }
      }
    })
    .optional(),
  body("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isMobilePhone(["id-ID"])
    .withMessage("Invalid phone format!")
    .custom(async (phone, { req }) => {
      const { id } = req.params;
      if (id) {
        const user = await User.findByPk(id);
        phone = user.phone;

        if (phone === user.phone) {
          return true;
        }
      }
    })
    .optional(),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.array(),
      });
    }
    next();
  },
];

module.exports = validateUser;
