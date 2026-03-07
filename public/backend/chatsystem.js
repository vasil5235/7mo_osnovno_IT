const express = require('express');
const http = require('http');
const ws = require('ws'); // Import ws here

const app = express.Router();
const server = http.createServer(app);

const wss = new ws.Server({server: server,path: "/messages"}); // One server to rule them all; // Attach WebSocket to the same server


app.use(express.json());
app.use(express.static("public/frontend"));

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

// WebSocket Logic




