const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'e-commerce-user'
    },
    list: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'e-commerce-product'
        },
        quantity: {
            type: Number
        }
    }]
}, {
        timestamps: {}
    })

let Carts = mongoose.model('e-commerce-cart', cartSchema)

module.exports = Carts