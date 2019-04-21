const router = require('express').Router(),
controllerUser = require('../controllers/user')

router.post('/signup', controllerUser.signUp)

router.post('/signin', controllerUser.signIn)

router.get('/city', controllerUser.getCity)

module.exports = router