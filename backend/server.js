// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST'],
    },
});

const users = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('login', (credentials, callback) => {
        const { username, password } = credentials;
        if (username && username.trim() && password && password.trim()) {
            users[socket.id] = username.trim();
            callback({ success: true, username: users[socket.id] });
            io.emit('user-connected', users[socket.id]);
            io.emit('user-list', Object.values(users));
        } else {
            callback({ success: false, error: 'Username and password cannot be empty.' });
        }
    });

    socket.on('send-message', (message) => {
        if (users[socket.id]) {
            console.log('Message received from:', users[socket.id], message);
            const timestamp = new Date().toLocaleTimeString();
            const messageData = {
                sender: users[socket.id],
                text: message,
                timestamp: timestamp,
            };
            io.emit('receive-message', messageData);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const disconnectedUser = users[socket.id];
        delete users[socket.id];
        io.emit('user-disconnected', disconnectedUser);
        io.emit('user-list', Object.values(users));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});