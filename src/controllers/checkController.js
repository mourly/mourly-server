const { Op } = require("sequelize");
const { ERROR_TYPES } = require("../constants/errors");
const { User } = require("../models");
const { errorResponse, successResponse } = require("../utils/response");

// ----- Email Controller ----- //
const emailController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(200).json(successResponse());
    }

    return res
      .status(404)
      .json(errorResponse(ERROR_TYPES.unknown_err, { code: "auth_111" }));
  } catch (err) {
    res.status(500).json(errorResponse(ERROR_TYPES.unknown_err));
  }
};

// ----- Username Controller ----- //
const usernameController = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      return res.status(200).json(successResponse());
    }

    return res
      .status(404)
      .json(errorResponse(ERROR_TYPES.unknown_err, { code: "auth_104" }));
  } catch (err) {
    res.status(500).json(errorResponse(ERROR_TYPES.unknown_err));
  }
};

// ----- Check User Existence ----- //
const checkUserExistence = async (username, email) => {
  const response = {
    email: false,
    username: false,
  };

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [{ email, username }],
      },
    });

    if (users.length) {
      users.forEach((user) => {
        if (user.email === email) response.email = true;

        if (user.username === username) response.username = true;
      });
    }

    return response;
  } catch (err) {
    console.log(
      "Check User Existence Error (controllers/checkController): ",
      err
    );
    return;
  }
};

// ----- Exports ----- //
module.exports = {
  emailController,
  usernameController,
  checkUserExistence,
};
