const express = require('express');
const http = require('http');
const app = express();
const mysql = require('mysql2');
const server = http.createServer(app);
const cors = require('cors');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'nouser',
    password: 'Camera77',
    database: 'SiteData'
}).promise();

async function GetNotes(name) {
    const [rows] = await pool.query(`SELECT * FROM Users WHERE Username = ?`, [name]);
    return rows;
}

app.use(cors());
app.use(express.json());
app.use(express.static("public/frontend"));

// Import modules
const Login = require('./Login.js');
// const chatSystem = require('./chatsystem.js');
const ws = require("ws");
const wss = new ws.Server({server});

wss.on('connection', (socket) => {
    console.log('Client connected to WebSocket');

    socket.on('message', (message) => {
        const textMessage = message.toString();
        console.log('Received:', textMessage);

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(textMessage);
            }
        });
    });
});

// Mount routers
app.use('/login', Login);
// app.use('/chatsystem', chatSystem);
// Add this in app.js
app.get('/', (req, res) => {
    res.redirect('/login');
});
app.post('/updateStatus', async (req, res) => {
    let data = await req.body;
    console.log(data);
    pool.query('UPDATE reports SET status = ? WHERE id = ?;',[data.status,data.id])
    res.sendStatus(200);

})
app.post('/login' ,async (req, res) => {
    console.log(req.body);
    let data = await GetNotes(req.body.username);
    console.log(data);
    if(req.body.username === 'teacher')
    {

        res.status(200).sendFile("reports.html", { root: "./public/frontend" });
    }
    else
    {
        res.status(404).sendFile("report.html", { root: "./public/frontend/Sfrontend" });
    }


});

app.post('/report',async (req, res) => {

    let data = await req.body;
    const report ={
        userid: 1,
        JsonData: data,
    }

    console.log(data);
    await pool.query(
        'INSERT INTO reports (UserId, report, Status) VALUES (?, ?, ?)', [report.userid, JSON.stringify(data), 'waiting']);

    res.sendStatus(200);

})
app.get('/reports', async (req, res) => {
    let [data] = await pool.query("select * from reports");


    res.status(200).send(JSON.stringify(data));
})
server.listen(3000,'0.0.0.0', () => {
    console.log('Master Server running on http://localhost:3000');
});


