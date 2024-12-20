const {
  emailValidation,
  passwordValidation,
  registerValidation,
  usernameValidation,
  dateValidation,
  loginValidation,
  termValidation,
  tokenValidation,
} = require("./authValidations");

const validate = require("./validate");

module.exports = {
  validate,
  emailValidation,
  passwordValidation,
  registerValidation,
  usernameValidation,
  dateValidation,
  loginValidation,
  termValidation,
  tokenValidation,
};
