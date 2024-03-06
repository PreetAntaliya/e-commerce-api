const express = require("express");
const port = 8000;
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path')
const db = require('./config/db')

app.use(express.json());
app.use(express.urlencoded());
app.set( "view engine", "ejs" );

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

app.use('/',require('./routes/index'));

app.listen(port, (err) => {
    (err)  ? console.log(err) && false : console.log(`Server running on http://localhost:${port}/`);
})
