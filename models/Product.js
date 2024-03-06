const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    categoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    subcategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subcategory"
    },
    product_name : {
        type : String,
        required: true
    },
    productImg : {
        type : [String],
        required: true
    },
    product_price : {
        type : Number,
        required: true
    },
    product_qty : {
        type : Number,
        required: true
    },
    product_description : {
        type : String,
        required: true
    },
    status : {
        type : Number,
        default : 1
    },
})

const product = mongoose.model('product', productSchema)
module.exports = product;