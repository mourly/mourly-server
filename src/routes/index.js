const { Router } = require("express");

// xxx/
const router = Router();

router.get("/", (_, res) => res.send("Hello World!"));

module.exports = router;
