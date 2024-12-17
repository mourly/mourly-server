const { ERROR_TYPES, getErrorMessage } = require("../constants/errors");
const { User } = require("../models");
const { generateUserID } = require("../utils/generateID");
const { errorResponse } = require("../utils/response");
const { checkUserExistence } = require("./checkController");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  let details = [];

  const user = await checkUserExistence(username, email);

  if (!user)
    return res.status(500).json(
      errorResponse(ERROR_TYPES.unknown_err, {
        message: "Error checking user existence.",
      })
    );

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
    return res
      .status(400)
      .json(errorResponse(ERROR_TYPES.user_err, { details }));

  const newUser = await User.create({
    id: await generateUserID(),
    username,
    email,
    password,
  });

  res.status(200).json(newUser);
  console.log("New User: ", newUser);
};

module.exports = {
  registerController,
};
