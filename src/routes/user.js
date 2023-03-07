const { registerUser } = require('../controllers/user')

const router = require('express').Router()

router.route('/').post(registerUser)

module.exports = router