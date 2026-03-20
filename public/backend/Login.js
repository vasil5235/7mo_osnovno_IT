const express = require('express');
const http = require('http');

const cors = require('cors');
const path = require('path');


const app = express.Router();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../frontend','login.html'));

});

module.exports = app;