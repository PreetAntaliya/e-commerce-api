const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    status : {
        type : Number,
        default : 1
    }
})

const category = mongoose.model('category', categorySchema)
module.exports = category;