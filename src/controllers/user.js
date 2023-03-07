const User = require('../models/user')


const registerUser = async (req, res, next) => {
    const {username, password} = req.body

    const hashedPassword = await User.hashPassword(password)

    console.log(hashedPassword)

    const user = new User(null, username, hashedPassword)

    // await user.save()

    res.status(201).json(`Hello ${username}, your registration was successful`)
}

module.exports = {
    registerUser
}