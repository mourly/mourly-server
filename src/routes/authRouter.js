const { Router } = require("express");
const { registerController } = require("../controllers/authControllers");

const { validate, registerValidation } = require("../validations");

// xxx/auth
const router = Router();

// xxx/auth/register [POST]
router.post("/register", registerValidation, validate, registerController);

module.exports = router;
