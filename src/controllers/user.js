const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../config/errors/index");

const getAllUsers = async (req, res, next) => {
  try {
    const [users, _] = await User.findAll()

    const newUsers = []

    users.forEach(user => {
      const {password, ...data } = user

      newUsers.push(data)
    })

    console.log(newUsers)

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      users: newUsers
    });
  } catch (error) {
    next(error);
  }
};

const getAUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const [user, _] = await User.findById(userId);

    if (!user[0])
      throw new BadRequestError(`The user with id ${userId} does not exist`);

    const {password, ...data} = user[0]
    
    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      user: data,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {username} = req.body
    const userId = req.params.userId
    const updatedUser = await User.updateById(userId, username)

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      msg: `Hello ${username},your username update was successful`,
    });

  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  try {
     const userId = req.params.userId;

     const deletedUser = await User.deleteById(userId);

     console.log(deletedUser)

     if (!deleteUser)
       throw new BadRequestError(`The user with id ${userId} does not exist`);


     res.status(StatusCodes.OK).json({
       Status: "SUCCESS",
       msg: `User with id ${userId} has been deleted successfully`,
     });
  } catch (error) {
    next(error)
  } 


  //pending work...when a user is deleted, the userId of the next created user should take the deleted Id not an incremented id...
};

module.exports = {
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
};
