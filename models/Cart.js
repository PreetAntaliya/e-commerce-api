const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    quantity: {
        type: Number,
        default: 1
    },
})

const cart = mongoose.model('cart', cartSchema)
module.exports = cart;   