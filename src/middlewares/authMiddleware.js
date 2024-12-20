const { ERROR_TYPES } = require("../constants/errors");
const { verifyAccessToken } = require("../controllers/tokenController");
const { sendErrorResponse } = require("../utils/response");

const authenticateToken = (req, res, next) => {
  const header = req.headers["Authorization"];

  if (!header || !header.startsWith("Bearer "))
    return sendErrorResponse(res, 401, {
      type: ERROR_TYPES.authentication_err,
    });

  const token = header && header.split(" ")[1];

  if (!token)
    return sendErrorResponse(res, 401, {
      type: ERROR_TYPES.authentication_err,
      code: "auth_4",
    });

  const verify = verifyAccessToken(token);

  if (!verify)
    return sendErrorResponse(res, 403, {
      type: ERROR_TYPES.authentication_err,
      code: "auth_4",
    });

  req.user = verify;

  next();
};

module.exports = authenticateToken;
