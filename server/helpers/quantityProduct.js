const Product = require('../models/product')

module.exports = (id, quantity) => {
    Product
    .findById(id)
    .then(function (oneProduct) {
        oneProduct.amount += quantity
        oneProduct.save()
    })
    .catch(function (err) {
        throw new Error({
            message: err.message
        })
    })
}