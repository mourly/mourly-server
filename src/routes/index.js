const { Router } = require("express");

const authRouter = require("./authRouter");
const checkRouter = require("./checkRouter");

// xxx/
const router = Router();

router.use("/auth", authRouter);
router.use("/check", checkRouter);

module.exports = router;
