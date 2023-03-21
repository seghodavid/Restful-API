const { StatusCodes } = require("http-status-codes");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = new User(null, username, hashedPassword);

    const result = await user.save();

    res
      .status(StatusCodes.CREATED)
      .json({
        Status: "SUCCESS",
        msg: `Hello ${username}, your registration was successful`,
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local-login", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid username or password" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const secretKey = process.env.JWT_SECRETKEY;
      
      const token = jwt.sign({ userId: user[0].userId }, secretKey);
      return res.status(StatusCodes.ACCEPTED).json({
        Status: "SUCCESS",
        msg: `Welcome,have fun making and going through existing quotes`,
        token: token,
      });
    });
  })(req, res, next);
};

module.exports = {
  registerUser,
  loginUser,
};
