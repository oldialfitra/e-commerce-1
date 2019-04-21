const router = require('express').Router(),
    controllerCart = require('../controllers/cart')

router.get('/my', controllerCart.getMyCart)

router.put('/buy', controllerCart.buyProduct)

router.put('/change', controllerCart.productPlusMinus)

router.put('/remove', controllerCart.removeProduct)

router.put('/checkout', controllerCart.checkOut)

router.post('/cost', controllerCart.getCost)

module.exports = router