const router = require('express').Router(),
    controllerTransaction = require('../controllers/transaction'),
    { authorization } = require('../middlewares/auth')

router.get('/', authorization, controllerTransaction.getAllTransaction)

router.post('/', controllerTransaction.checkout)

router.get('/my', controllerTransaction.getMyTransaction)

router.put('/send/:id', authorization, controllerTransaction.sendTransaction)

router.put('/confirm/:id', controllerTransaction.confirmTransaction)

module.exports = router