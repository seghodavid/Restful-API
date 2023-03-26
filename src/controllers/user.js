const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../config/errors/index");

const getAllUsers = async (req, res, next) => {
  try {
    const [users, _] = await User.findAll()

    const newUsers = users.map(({ password, ...data }) => data);

   res.status(StatusCodes.OK).json({
     status: "success",
     users: newUsers,
   });
  } catch (error) {
    next(error);
  }
};

const getAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;;

    const [user, _] = await User.findById(userId);

    if (!user[0])
      throw new BadRequestError(`The user with id ${userId} does not exist`);

    const {password, ...data} = user[0]
    
     res.status(StatusCodes.OK).json({
       status: "success",
       user: data,
     });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {username} = req.body
    const { userId } = req.params;
     await User.updateById(userId, { username });

     res.status(StatusCodes.OK).json({
       status: "success",
       message: `Hello ${username}, your username update was successful`,
     });

  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.deleteById(userId);


        if (!deletedUser)
          throw new BadRequestError(
            `The user with id ${userId} does not exist`
          );


     res.status(StatusCodes.OK).json({
       status: "success",
       message: `User with id ${userId} has been deleted successfully`,
     });
  } catch (error) {
    next(error)
  }

};

module.exports = {
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
};
