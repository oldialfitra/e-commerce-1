const Product = require('../models/product'),
    Cart = require('../models/cart'),
    Transactions = require('../models/transaction')

class ControllerProduct {

    static addProduct(req, res) {
        if (req.file) {
            Product
                .create({
                    name: req.body.name,
                    amount: req.body.amount,
                    price: req.body.price,
                    featured_image: req.file.cloudStoragePublicUrl,
                })
                .then(function (newProduct) {
                    res.status(201).json(newProduct)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json({
                            message: err.errors.name.message
                        })
                    } else if (err.errors.amount) {
                        res.status(400).json({
                            message: err.errors.amount.message
                        })
                    } else if (err.errors.price) {
                        res.status(400).json({
                            message: err.errors.price.message
                        })
                    } else if (err.errors.featured_image) {
                        res.status(400).json({
                            message: err.errors.featured_image.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
        else {
            Product
                .create({
                    name: req.body.name,
                    amount: req.body.amount,
                    price: req.body.price,
                })
                .then(function (newProduct) {
                    res.status(201).json(newProduct)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json({
                            message: err.errors.name.message
                        })
                    } else if (err.errors.amount) {
                        res.status(400).json({
                            message: err.errors.amount.message
                        })
                    } else if (err.errors.price) {
                        res.status(400).json({
                            message: err.errors.price.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
    }

    static getAllProduct(req, res) {
        Product
            .find()
            .then(function (allProducts) {
                res.status(200).json(allProducts)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneProduct(req, res) {
        Product
            .findById(req.params.id)
            .then(function (oneProduct) {
                res.status(200).json(oneProduct)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateProduct(req, res) {
        if (req.file) {
            Product
                .findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    amount: req.body.amount,
                    price: req.body.price,
                    featured_image: req.file.cloudStoragePublicUrl,
                }, {
                        new: true
                    })
                .then(function (oneProduct) {
                    res.status(200).json(oneProduct)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json({
                            message: err.errors.name.message
                        })
                    } else if (err.errors.amount) {
                        res.status(400).json({
                            message: err.errors.amount.message
                        })
                    } else if (err.errors.price) {
                        res.status(400).json({
                            message: err.errors.price.message
                        })
                    } else if (err.errors.featured_image) {
                        res.status(400).json({
                            message: err.errors.featured_image.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
        else {
            Product
                .findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {
                        new: true
                    })
                .then(function (oneProduct) {
                    res.status(200).json(oneProduct)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json({
                            message: err.errors.name.message
                        })
                    } else if (err.errors.amount) {
                        res.status(400).json({
                            message: err.errors.amount.message
                        })
                    } else if (err.errors.price) {
                        res.status(400).json({
                            message: err.errors.price.message
                        })
                    } else if (err.errors.featured_image) {
                        res.status(400).json({
                            message: err.errors.featured_image.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
    }

    static deleteProduct(req, res) {
        Cart
            .find()
            .then(function (allCart) {
                allCart.forEach((e, i) => {
                    e.list.forEach((f, j) => {
                        if (f.product._id.toString() === req.params.id) {
                            allCart[i].list.splice(j, 1)
                            allCart[i].save()
                        }
                    });
                });
                return allCart
            })
            .then(function (oneCart) {
                return Transactions
                    .find()
                    .populate('list.product')
                    .populate('user')
            })
            .then(function (allTransactions) {
                let id = []
                allTransactions.forEach((e, i) => {
                    e.list.forEach((f, j) => {
                        let cost = 0
                        if (f.product._id.toString() === req.params.id) {
                            cost = f.product.price * f.quantity
                            e.total -= cost
                            e.list.splice(j, 1)
                            if (e.list.length < 1) {
                                id.push(e._id)
                            }
                        }
                        e.save()
                    });
                });
                if (id.length === 0) {
                    return allTransactions
                }
                else {
                    return Transactions
                        .deleteMany({
                            _id: id
                        })
                }
            })
            .then(function (allTransactions) {
                return Product
                    .findByIdAndDelete(req.params.id)
            })
            .then(function (oneProduct) {
                res.status(200).json(oneProduct)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerProduct