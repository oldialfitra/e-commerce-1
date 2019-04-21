const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount required'],
        min: [0, 'Minimal 0'],
    },
    price: {
        type: Number,
        required: [true, 'Price required'],
        min: [0, 'Minimal 0'],
    },
    featured_image: {
        type: String,
    },
}, {
        timestamps: {}
    })

let Products = mongoose.model('e-commerce-product', productSchema)

module.exports = Products