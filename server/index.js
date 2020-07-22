const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router  = require('./router');
const { Socket } = require('dgram');

/* Port */
const PORT = process.env.PORT || 5000; 

const app = express(); 
const server = http.createServer(app); 
const io = socketio(server);

// Connect react time client
io.on('connection', (socket) => {
    console.log('We have a new connection')


    // when user leave realtime connection
    Socket.on('disconnect', () => {
        console.log('User had left')
    });
})


/* Routers */
app.use(router); 


/** Server is listening */
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))