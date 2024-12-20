const jwt = require("jsonwebtoken");

const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;

// ----- Generate Access Token ----- //
const generateAccessToken = (id) =>
  jwt.sign({ id }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

// ----- Generate Refresh Token ----- //
const generateRefreshToken = (id) =>
  jwt.sign({ id }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

// ----- Verify Access Token ----- //
const verifyAccessToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
    return verify;
  } catch {
    return false;
  }
};

// ----- Verify Refresh Token ----- //
const verifyRefreshToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
    return verify;
  } catch {
    return false;
  }
};

// ----- Day Until Expiration ----- //
const daysUntilExpiration = (exp) => {
  const nowDate = new Date().getTime() / 1000;
  return Math.floor((exp - nowDate) / 60 / 60 / 24);
};

// ----- Exports ----- //
module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  daysUntilExpiration,
};
