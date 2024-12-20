const ERROR_TYPES = {
  validation_err: "VALIDATION_ERROR",
  database_err: "DATABASE_ERROR",
  unknown_err: "UNKNOWN_ERROR",
  user_err: "USER_ERROR",
  timeout_err: "TIMEOUT_ERROR",
  rate_limit_err: "RATE_LIMIT_ERROR",
  authentication_err: "AUTHENTICATION_ERROR",
  authorization_err: "AUTHORIZATION_ERROR",
  token_exp_err: "TOKEN_EXPIRED_ERROR",
};

module.exports = ERROR_TYPES;
