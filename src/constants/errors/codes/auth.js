const AUTH_CODES = {
  // ----- General ----- //
  auth_0: "Bu alan boş bırakılamaz.",

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
  auth_132:
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
};

module.exports = AUTH_CODES;
