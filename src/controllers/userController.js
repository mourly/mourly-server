const { User } = require("../models");

// ----- Find User By Email ----- //
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (user) return user;
  } catch (err) {
    console.log("Get A User By Email Error: ", err);
  }
};

module.exports = {
  findUserByEmail,
};
