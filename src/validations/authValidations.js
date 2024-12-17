const { body } = require("express-validator");

// ----- USERNAME VALIDATION ----- //
const usernameValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("auth_0")
    .isLength({ min: 3, max: 16 })
    .withMessage("auth_100")
    .matches(/^[a-z0-9_]+$/)
    .withMessage("auth_102")
    .matches(/_$/)
    .withMessage("auth_103"),
];

// ----- EMAIL VALIDATION ----- //
const emailValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("auth_0")
    .isEmail()
    .withMessage("auth_110")
    .normalizeEmail(),
];

// ----- PASSWORD VALIDATION ----- //
const passwordValidation = [
  body("password")
    .notEmpty()
    .withMessage("auth_0")
    .isLength({ min: 8 })
    .withMessage("auth_120")
    .isLength({ max: 64 })
    .withMessage("auth_121")
    .matches(/[a-z]/)
    .withMessage("auth_122")
    .matches(/[A-Z]/)
    .withMessage("auth_123")
    .matches(/\d/)
    .withMessage("auth_124")
    .matches(/[\W_]/)
    .withMessage("auth_125"),
];

// ----- REGISTER VALIDATION ----- //
const registerValidation = [
  ...usernameValidation,
  ...emailValidation,
  ...passwordValidation,
];

module.exports = {
  usernameValidation,
  emailValidation,
  passwordValidation,
  registerValidation,
};
