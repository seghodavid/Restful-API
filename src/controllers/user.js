const User = require('../models/user')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
    const {username, password} = req.body

    const hashedPassword = User.hashPassword(password)

    const user = new User(null, username, hashedPassword)

    await user.save()

    res.status(201).json(`Hello ${username}, your registration was successful`)
}

// const loginUser = async (req, res, next) => {
//     const user = await User.findOne()
// }

module.exports = {
    registerUser
}