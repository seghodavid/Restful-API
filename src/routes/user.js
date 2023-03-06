const { createUser } = require('../controllers/user')

const router = require('express').Router()

router.route('/').post(createUser)

module.exports = router