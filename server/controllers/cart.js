const Cart = require('../models/cart'),
    Product = require('../models/product'),
    User = require('../models/user'),
    quantityProduct = require('../helpers/quantityProduct'),
    axios = require('axios')

class ControllerCart {

    static getMyCart(req, res) {
        Cart
            .findOne({
                user: req.userLoggedIn.id
            })
            .populate('list.product')
            .then(function (myCarts) {
                console.log(myCarts)
                res.status(200).json(myCarts)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static buyProduct(req, res) {
        Cart
        .findOne({
            user: req.userLoggedIn.id
        })
            .then(function (oneCart) {
                if (oneCart.list.length === 0) {
                    return Cart
                        .findByIdAndUpdate(oneCart._id, {
                            $push: {
                                list: {
                                    product: req.body.product,
                                    quantity: 1
                                }
                            }
                        }, {
                                new: true
                            })
                }
                else {
                    let count = 0
                    let i = 0
                    oneCart.list.forEach((e, index) => {
                        if (e.product.toString() === req.body.product.toString()) {
                            count = 1
                            i = index
                        }
                    });
                    if (count > 0) {
                        oneCart.list[i].quantity += 1
                        return oneCart.save()
                    }
                    else {
                        return Cart
                            .findByIdAndUpdate(oneCart._id, {
                                $push: {
                                    list: {
                                        product: req.body.product,
                                        quantity: 1
                                    }
                                }
                            }, {
                                    new: true
                                })
                    }

                }
            })
            .then(function (oneCart) {
                return Product
                    .findById(req.body.product)
            })
            .then(function (oneProduct) {
                oneProduct.amount -= 1
                return oneProduct.save()
            })
            .then(function (oneProduct) {
                res.status(200).json(oneProduct)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static productPlusMinus(req, res) {
        Cart
            .findOne({
                user: req.userLoggedIn.id
            })
            .then(function (oneCart) {
                let i = 0
                oneCart.list.forEach((e, index) => {
                    if (e.product.toString() === req.body.product) {
                        i = index
                    }
                });
                if (req.body.option === 'plus') {
                    oneCart.list[i].quantity += 1
                    return oneCart.save()
                }
                else {
                    console.log('masuk ke else 1')
                    oneCart.list[i].quantity -= 1
                    console.log(oneCart.list[i].quantity)
                    if (oneCart.list[i].quantity < 1) {
                        console.log('masuk ke else 2')
                        oneCart.list.splice(i, 1)
                        return oneCart.save()
                    }
                    else {
                        console.log('masuk ke else 2')
                        return oneCart.save()
                    }
                }
                // return { cart: oneCart, index: i }
            })
            .then(function (oneCart) {
                return Product
                    .findById(req.body.product)
                // if (oneCart.cart.list[oneCart.index].quantity < 1) {
                //     oneCart.cart.list[i] = []
                //     return oneCart.cart.save()
                // }
                // else {
                //     return oneCart.cart.save()
                // }
            })
            .then(function (oneProduct) {
                if (req.body.option === 'plus' && oneProduct.amount > 0) {
                    oneProduct.amount -= 1
                    return oneProduct.save()
                }
                else if (req.body.option === 'minus') {
                    oneProduct.amount += 1
                    return oneProduct.save()
                }
            })
            .then(function (oneCart) {
                res.status(200).json(oneCart)
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static removeProduct(req, res) {
        Cart
            .findOne({
                user: req.userLoggedIn.id
            })
            .then(function (oneCart) {
                let i = 0
                let quantity = 0
                oneCart.list.forEach((e, index) => {
                    if (e.product.toString() === req.body.product.toString()) {
                        i = index
                        quantity = e.quantity
                        oneCart.list.splice(index, 1)
                    }
                });
                quantityProduct(req.body.product, quantity)
                // return {i, quantityProduct}
                // return {i, cart: oneCart.list.splice}
                return oneCart.save()
                // return 
            })
            .then(function (oneCart) {
                console.log(oneCart)
                res.status(200).json(oneCart)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static checkOut(req, res) {
        Cart
        .findOneAndUpdate({
            user: req.userLoggedIn.id
        }, {
            list: []
        }, {
            new: true
        })
        .then(function (oneCart) {
            res.status(200).json(oneCart)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static getCost(req, res) {
        User
            .findById(req.userLoggedIn.id)
            .then(function (oneUser) {
                return axios
                    .post('https://api.rajaongkir.com/starter/cost', {
                        origin: 152,
                        destination: oneUser.cityId,
                        weight: 1,
                        courier: 'jne'
                    }, {
                        headers: {
                            key: process.env.RAJAONGKIRKEY
                        }
                    })
            })
            .then(function ({data}) {
                console.log(data)
                res.status(200).json(data.rajaongkir.results[0].costs[0].cost[0].value)
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerCart