const jwt = require('jsonwebtoken'),
    User = require('../models/user')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try {
                req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
                console.log(req.userLoggedIn)
                next();
            }
            catch {
                res.status(401).json({ message: `You are not Authenticate` })
            }
        }
        else {
            res.status(401).json({ message: `Login First` })
        }
    },
    authorization(req, res, next) {
        User
            .findById(req.userLoggedIn.id)
            .then(function (oneUser) {
                if (!oneUser) {
                    res.status(401).json({ message: `You are not Authorized` })
                }
                else {
                    if (oneUser.role !== 'admin') {
                        res.status(401).json({ message: `You are not Authorized` })
                    }
                    else {
                        next()
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}