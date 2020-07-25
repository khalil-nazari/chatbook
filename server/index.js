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

    socket.on('join_khalil', ({ name, room }, callback) => {
        console.log(name, room)
        
        
        /* error handling with callback
        let error = true; 
        if(error) {
            callback({error : 'There is an error 2323', name, room});
            console.log(55555555555555555555555)
        }
        */
    })


    
    // when user leave realtime connection
    socket.on('disconnect', () => {
        console.log('User left')
    });
})


/* Routers */
app.use(router); 


/** Server is listening */
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))