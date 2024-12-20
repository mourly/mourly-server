const AUTH_CODES = {
  // ----- General ----- //
  auth_0: "This field cannot be left empty.",
  auth_1: "Email or password is incorrect.",
  auth_2: "You must be 18 years or older to use this application.",
  auth_3: "You must accept the terms of use.",
  auth_4: "You must provide a valid access token.",
  auth_5:
    "Provide a date value in the correct format (YYYY-MM-DD) to verify your age.",

  // ----- Username (100 - 109) ----- //
  auth_100: "Username must be between 3 and 16 characters.",
  auth_101: "Username must start with a letter.",
  auth_102:
    "Username can only contain lowercase letters, numbers, and underscores.",
  auth_103: "Username cannot end with an underscore.",
  auth_104: "This username is already taken.",

  // ----- Email (110 - 119) ----- //
  auth_110: "Please enter a valid email address.",
  auth_111: "This email address is already registered.",

  // ----- Password (120 - 129) ----- //
  auth_120: "Password must be at least 8 characters.",
  auth_121: "Password must be at most 64 characters.",
  auth_122: "Password must contain at least one lowercase letter.",
  auth_123: "Password must contain at least one uppercase letter.",
  auth_124: "Password must contain at least one number.",
  auth_125: "Password must contain at least one special character.",

  auth_126:
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
};

module.exports = AUTH_CODES;
