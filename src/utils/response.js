const { getErrorMessage } = require("../constants/errors");
const { generateErrorResponseID } = require("./generateID");

// ----- Success Response ----- //
const successResponse = (data = null, message = null) => {
  const response = {
    success: true,
    meta: {
      timestamp: Date.now(),
    },
  };

  if (data) response["data"] = data;
  if (message) response["message"] = message;

  return response;
};

// ----- Error Response ----- //
const errorResponse = (
  type,
  { code = null, message = null, details = null } = {}
) => {
  const response = {
    success: false,
    id: generateErrorResponseID(),
    type,
    meta: {
      timestamp: Date.now(),
    },
  };

  if (message) response["message"] = message;
  if (details) response["details"] = details;
  if (code) response["code"] = code;

  return response;
};

// ----- Send Error Response ----- //
const sendErrorResponse = (res, status, { type, details, message, code }) => {
  let msg;

  if (message) {
    msg = message;
  } else {
    if (code) msg = getErrorMessage(code);
  }

  res.status(status).json(
    errorResponse(type, {
      code,
      message: msg,
      details,
    })
  );
};
// ----- Exports ----- //
module.exports = { successResponse, errorResponse, sendErrorResponse };
