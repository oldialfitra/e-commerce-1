const router = require('express').Router(),
    routerUser = require('./user'),
    routerCart = require('./cart'),
    routerProduct = require('./product'),
    routerTransaction = require('./transaction'),
    { authentication } = require('../middlewares/auth')

router.use('/users', routerUser)

router.use('/products', routerProduct)

router.use('', authentication)

router.use('/carts', routerCart)

router.use('/transactions', routerTransaction)

module.exports = router