const router = require('express').Router(),
    controllerProduct = require('../controllers/product'),
    { authorization, authentication } = require('../middlewares/auth'),
    image = require('../helpers/images')

router.get('/', controllerProduct.getAllProduct)

router.use('', authentication)

router.post('/', authorization, image.multer.single('image'), image.sendUploadToGCS, controllerProduct.addProduct)

router.get('/:id', controllerProduct.getOneProduct)

router.put('/:id', image.multer.single('image'), image.sendUploadToGCS, authorization, controllerProduct.updateProduct)

router.delete('/:id', authorization, controllerProduct.deleteProduct)

module.exports = router