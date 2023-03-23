const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");
const passport = require("passport");

router.route("/register").post(registerUser);

router.use(passport.authenticate("local-login")).route("/login").post(loginUser);

module.exports = router;
