const express = require('express');
const http = require('http');
const mysql = require('mysql2');
const cors = require('cors');

const app = express.Router();
const server = http.createServer(app);

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'nouser',
    password: 'Camera77',
    database: 'SiteData'
}).promise();
// 2. ADD: This middleware is REQUIRED to read data from your frontend forms
app.use(cors());
app.use(express.json());
app.use(express.static('Sfrontend'));
app.use(express.urlencoded({ extended: true }));

// app.post('/reports', (req, res) => {
//     const data = req.body;
//     pool.query("alter table Reports ()");
// })