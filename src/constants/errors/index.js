const AUTH_CODES = require("./codes/auth");
const ERROR_TYPES = require("./types");

const ERROR_CODES = {
  ...AUTH_CODES,
};

const getErrorMessage = (code) => ERROR_CODES[code];

module.exports = {
  ERROR_TYPES,
  ERROR_CODES,
  getErrorMessage,
};
