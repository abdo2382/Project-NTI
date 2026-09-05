const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

router.get("/profile", protect, authControllers.getProfile);

module.exports = router;
