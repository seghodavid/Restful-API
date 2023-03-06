const User = require('../models/user')

const createUser = (req, res, next) => {
    const user = new User(null, "John Doe", "123456")

    user.save()
}

module.exports = {
    createUser
}