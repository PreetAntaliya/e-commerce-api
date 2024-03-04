const mongoose = require( 'mongoose' );
mongoose.connect('mongodb://localhost:27017/api-main')
const db = mongoose.connection

db.on('connected', (err) => {
    (err) ? console.log(err) && false : console.log("Connected to MongoDB")
})