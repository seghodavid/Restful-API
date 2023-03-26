const { StatusCodes } = require("http-status-codes");
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = new User(null, username, password);

    const result = await user.save();

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: `Hello ${username}, your registration was successful`,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const secretKey = process.env.JWT_SECRETKEY;

    const token = jwt.sign({ userId: req.user[0].userId }, secretKey);

    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      message: `Welcome, have fun making and going through existing quotes`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
