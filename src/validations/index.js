const {
  emailValidation,
  passwordValidation,
  registerValidation,
  usernameValidation,
} = require("./authValidations");

const validate = require("./validate");

module.exports = {
  validate,
  emailValidation,
  passwordValidation,
  registerValidation,
  usernameValidation,
};
