const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../config/errors");

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (!decoded) {
      throw new UnauthenticatedError("Invalid Request");
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    // console.log(error)
    throw new UnauthenticatedError("Authentication Invalid");
  }
};


module.exports = { isAuth };
