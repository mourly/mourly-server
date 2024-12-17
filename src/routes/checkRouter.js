const { Router } = require("express");
const {
  emailController,
  usernameController,
} = require("../controllers/checkController");
const {
  emailValidation,
  validate,
  usernameValidation,
} = require("../validations");

// xxx/check
const router = Router();

router.post("/email", emailValidation, validate, emailController);

router.post("/username", usernameValidation, validate, usernameController);

module.exports = router;
