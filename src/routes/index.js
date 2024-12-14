const { Router } = require("express");

const authRouter = require("./authRouter");

// xxx/
const router = Router();

router.get("/auth", authRouter);

module.exports = router;
