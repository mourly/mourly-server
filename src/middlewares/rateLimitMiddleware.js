const rateLimit = require("express-rate-limit");
const { sendErrorResponse } = require("../utils/response");
const { ERROR_TYPES } = require("../constants/errors");

const defaultRateLimitSkip = () => false;
const defaultRateLimitKey = (req) => (req.user ? req.user.id : req.ip);
const defaultRateLimitHandler = (_, res) =>
  sendErrorResponse(res, 429, {
    message: "Too many requests, please try again later.",
    type: ERROR_TYPES.rate_limit_err,
  });

const rateLimitDefaults = {
  standardHeaders: true,
  ms: 60 * 1000 * 15,
  max: 100,
  skipFailedReq: false,
  skipSuccessReq: false,
  skip: defaultRateLimitSkip, // belki sonradan admin veya developerlara geçiş sağlanabilir
  key: defaultRateLimitKey,
  handler: defaultRateLimitHandler,
};

const createRateLimiter = ({
  ms,
  max,
  skipFailedReq,
  skipSuccessReq,
  skip,
  key,
  handler,
} = {}) =>
  rateLimit({
    windowMs: ms || rateLimitDefaults.ms,
    max: max || rateLimitDefaults.max,
    skipFailedRequests: skipFailedReq || rateLimitDefaults.skipFailedReq,
    skipSuccessfulRequests: skipSuccessReq || rateLimitDefaults.skipSuccessReq,
    skip: skip || rateLimitDefaults.skip,
    keyGenerator: key || rateLimitDefaults.key,
    handler: handler || rateLimitDefaults.handler,
  });

module.exports = createRateLimiter;
