require('dotenv').config()

const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    cors = require('cors'),
    routerIndex = require('./routes/index')

// mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`, { useNewUrlParser: true })
mongoose.connect(`mongodb+srv://oldi:delete@miniwp-9mbzj.gcp.mongodb.net/e-commerce-new?retryWrites=true`, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routerIndex)

app.listen(port, function () {
    console.log('Listening on port:', port)
})

module.exports = app