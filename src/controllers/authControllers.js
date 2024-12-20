const { ERROR_TYPES, getErrorMessage } = require("../constants/errors");
const { sendWelcomeMail } = require("../emails/htmlEmailHandler");
const { User } = require("../models");
const { generateUserID } = require("../utils/generateID");
const { successResponse, sendErrorResponse } = require("../utils/response");
const { checkUserExistence } = require("./checkController");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  daysUntilExpiration,
} = require("./tokenController");
const { findUserByEmail } = require("./userController");
const bcrypt = require("bcrypt");

// ----- Register Controller ----- //
const registerController = async (req, res) => {
  const { username, email, password, date } = req.body;

  let details = [];

  const user = await checkUserExistence(username, email);

  if (!user)
    return sendErrorResponse(res, 500, {
      code: ERROR_TYPES.unknown_err,
      message: "Error checking user existence.",
    });

  if (user.username) {
    details.push({
      code: "auth_104",
      msg: getErrorMessage("auth_104"),
    });
  }
  if (user.email) {
    details.push({
      code: "auth_111",
      msg: getErrorMessage("auth_111"),
    });
  }

  if (details.length)
    return sendErrorResponse(res, 400, { type: ERROR_TYPES.user_err, details });

  try {
    await User.create({
      id: await generateUserID(),
      date_of_birth: date,
      username,
      email,
      password,
    });
    res.status(201).json(successResponse());
    await sendWelcomeMail(email, username);
  } catch (err) {
    sendErrorResponse(res, 500, { type: ERROR_TYPES.database_err });
    console.log("Register User Controller Error: ", err);
  }
};

// ----- Login Controller ----- //
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user)
      return sendErrorResponse(res, 401, {
        type: ERROR_TYPES.user_err,
        code: "auth_01",
      });

    const passverify = await bcrypt.compare(password, user.password);

    if (!passverify)
      return sendErrorResponse(res, 401, {
        type: ERROR_TYPES.user_err,
        code: "auth_01",
      });

    return res.status(200).json(
      successResponse({
        access_token: generateAccessToken(user.id),
        refresh_token: generateRefreshToken(user.id),
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        banner: user.banner,
        is_verified: user.is_verified,
        date_of_birth: user.date_of_birth,
        account_status: user.account_status,
      })
    );
  } catch (err) {
    console.log("Login Controller Error: ", err);
    sendErrorResponse(res, 500, { type: ERROR_TYPES.unknown_err });
  }
};

// ----- Refresh Token Controller ----- //
const refreshTokenController = (req, res) => {
  const token = req.body.token;

  const verifyToken = verifyRefreshToken(token);

  if (!verifyToken)
    return sendErrorResponse(res, 403, {
      type: ERROR_TYPES.authorization_err,
      code: "auth_4",
    });

  const response = {
    access_token: generateAccessToken(verifyToken.id),
  };

  if (daysUntilExpiration(verifyToken.exp) <= 3)
    response["refresh_token"] = generateRefreshToken(verifyToken.id);

  res.status(200).json(successResponse(response));
};

// ----- Exports ----- //
module.exports = {
  registerController,
  loginController,
  refreshTokenController,
};
