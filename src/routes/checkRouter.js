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
const createRateLimiter = require("../middlewares/rateLimitMiddleware");

// xxx/check
const router = Router();

const checkRateLimiter = createRateLimiter({ ms: 60 * 1000, max: 15 });

router.post(
  "/email",
  checkRateLimiter,
  emailValidation,
  validate,
  emailController
);

router.post(
  "/username",
  checkRateLimiter,
  usernameValidation,
  validate,
  usernameController
);

module.exports = router;
