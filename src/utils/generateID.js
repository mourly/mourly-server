const { v4: uuid } = require("uuid");
const { User } = require("../models");

// #### ----- #### ----- #### ----- ####

const generateRandomNumber = (length) => {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("Length must be a positive number.");
  }
  return Math.floor(Math.random() * `1e${length}`);
};

// #### ----- #### ----- #### ----- ####

const generateUserID = async () => {
  let randomID;

  let unique = false;

  do {
    randomID = generateRandomNumber(11).toString();
    const user = await User.findOne({ where: { id: randomID } });

    if (!user) unique = true;
  } while (!unique);

  return randomID;
};

// #### ----- #### ----- #### ----- ####

const generateErrorResponseID = () => uuid();

// #### ----- #### ----- #### ----- ####

const generateVerificationCode = () => generateRandomNumber(6);

// #### ----- #### ----- #### ----- ####

// ----- EXPORTS ----- //
module.exports = {
  generateErrorResponseID,
  generateRandomNumber,
  generateVerificationCode,
  generateUserID,
};
