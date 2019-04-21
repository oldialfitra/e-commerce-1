const User = require('../models/user'),
    { decrypt } = require('../helpers/bcrypt'),
    jwt = require('jsonwebtoken'),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.CLIENT_ID),
    axios = require('axios'),
    Cart = require('../models/cart')

class ControllerUser {

    static signUp(req, res) {
        console.log('masuk ke dalam sign up')
        User
            .create({
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                cityId: req.body.cityId,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
            .then(function (newUser) {
                return Cart
                    .create({
                        list: [],
                        user: newUser._id
                    })
            })
            .then(function (newUser) {
                res.status(201).json(newUser)
            })
            .catch(function (err) {
                if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else if (err.errors.name) {
                    res.status(400).json({
                        message: err.errors.name.message
                    })
                } else if (err.errors.address) {
                    res.status(400).json({
                        message: err.errors.address.message
                    })
                } else if (err.errors.city) {
                    res.status(400).json({
                        message: err.errors.city.message
                    })
                } else if (err.errors.cityId) {
                    res.status(400).json({
                        message: err.errors.cityId.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static signIn(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function (uLogin) {
                if (!uLogin) {
                    res.status(400).json({
                        message: 'email / password wrong'
                    })
                }
                else {
                    if (decrypt(req.body.password, uLogin.password) === false) {
                        res.status(400).json({
                            message: 'email / password wrong'
                        })
                    }
                    else {
                        let token = jwt.sign({ email: uLogin.email, id: uLogin._id }, process.env.SECRET)
                        res.status(200).json({ token, role: uLogin.role })
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getCity(req, res) {
        console.log('masuk ke all city')
        console.log(process.env.RAJAONGKIRKEY)
        axios
            .get('https://api.rajaongkir.com/starter/city', {
                headers: {
                    key: process.env.RAJAONGKIRKEY
                }
            })
            .then(function ({ data }) {
                console.log('masuk ke then')
                res.status(200).json(data.rajaongkir.results)
            })
            .catch(function (err) {
                console.log('masuk ke err')
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerUser