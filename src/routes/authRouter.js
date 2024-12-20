const { Router } = require("express");
const {
  registerController,
  loginController,
  refreshTokenController,
} = require("../controllers/authControllers");

const {
  validate,
  registerValidation,
  loginValidation,
  tokenValidation,
} = require("../validations");
const createRateLimiter = require("../middlewares/rateLimitMiddleware");

// xxx/auth
const router = Router();

const authRateLimiter = createRateLimiter({ ms: 1000 * 60, max: 15 });
const tokenRateLimiter = createRateLimiter({
  max: 3,
  ms: 60 * 60 * 1000,
});

// xxx/auth/register [POST]
router.post(
  "/register",
  authRateLimiter,
  registerValidation,
  validate,
  registerController
);

// xxx/auth/register [POST]
router.post(
  "/login",
  authRateLimiter,
  loginValidation,
  validate,
  loginController
);

// xxx/auth/refresh-token [POST]
router.post(
  "/refresh-token",
  tokenRateLimiter,
  tokenValidation,
  validate,
  refreshTokenController
);

module.exports = router;
