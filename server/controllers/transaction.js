const Transaction = require('../models/transaction'),
    Cart = require('../models/cart')

class ControllerTransaction {

    static getAllTransaction(req, res) {
        Transaction
            .find()
            .populate('list.product')
            .populate('user')
            .then(function (all) {
                res.status(200).json(all)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getMyTransaction(req, res) {
        console.log('masuk ke get my')
        Transaction
            .find({
                user: req.userLoggedIn.id
            })
            .populate('list.product')
            .populate('user')
            .then(function (my) {
                console.log(my, 'ini my')
                res.status(200).json(my)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static checkout(req, res) {
        Cart
            .findOne({
                user: req.userLoggedIn.id
            })
            .then(function (oneCart) {
                return Transaction
                    .create({
                        list: oneCart.list,
                        user: req.userLoggedIn.id,
                        total: req.body.total
                    })
            })
            .then(function (newTransaction) {
                res.status(201).json(newTransaction)
            })
            .catch(function (err) {
                if (err.errors.total) {
                    res.status(400).json({
                        message: err.errors.total.message
                    })
                }
                else {
                    res.status(500).json(err)
                }
            })
    }

    static sendTransaction(req, res) {
        Transaction
            .findByIdAndUpdate(req.params.id, {
                status: 'send'
            }, {
                new: true
            })
            .then(function (oneTransaction) {
                res.status(200).json(oneTransaction)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static confirmTransaction(req, res) {
        Transaction
            .findByIdAndUpdate(req.params.id, {
                status: 'confirm'
            }, {
                new: true
            })
            .then(function (oneTransaction) {
                res.status(200).json(oneTransaction)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerTransaction