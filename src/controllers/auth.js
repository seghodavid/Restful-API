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

    res.status(StatusCodes.CREATED).json({
      Status: "SUCCESS",
      msg: `Hello ${username}, your registration was successful`,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = (req, res, next) => {
      const secretKey = process.env.JWT_SECRETKEY;

      const token = jwt.sign({ userId: req.user[0].userId }, secretKey);

      return res.status(StatusCodes.ACCEPTED).json({
        Status: "SUCCESS",
        msg: `Welcome,have fun making and going through existing quotes`,
        token: token,
      });
}

module.exports = {
  registerUser,
  loginUser,
};
