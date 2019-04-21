const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const transactionSchema = new Schema({
    list: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'e-commerce-product'
            },
            quantity: {
                type: Number
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'e-commerce-user'
    },
    total: {
        type: Number,
        required: [true, 'Total required']
    },
    status: {
        type: String,
        default: ''
    }
}, {
        timestamps: {}
    })

const Transactions = mongoose.model('e-commerce-transaction', transactionSchema)
module.exports = Transactions