const { validationResult } = require("express-validator");
const { getErrorMessage, ERROR_TYPES } = require("../constants/errors");
const { errorResponse } = require("../utils/response");
const { sanitizeObj } = require("../middlewares/sanitizeMiddleware");

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    if (req.body) req.body = sanitizeObj(req.body);
    if (req.query) req.query = sanitizeObj(req.query);
    if (req.params) req.params = sanitizeObj(req.params);

    return next();
  }

  const errors = result.array().map((err) => ({
    name: err.path,
    code: err.msg,
    msg: getErrorMessage(err.msg),
  }));

  res
    .status(422)
    .json(errorResponse(ERROR_TYPES.validation_err, { details: errors }));
};

module.exports = validate;
