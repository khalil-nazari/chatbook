const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router  = require('./router');
const { Socket } = require('dgram');
const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js'); 

/* Port */
const PORT = process.env.PORT || 5000; 

const app = express(); 
const server = http.createServer(app); 
const io = socketio(server);


// Connect react time client
io.on('connection', (socket) => {
    console.log('We have a new connection')

    socket.on('join_khalil', ({ name, room }, callback) => {
        
        const { error, user } = addUser({id: socket.id, name, room});
        
        if(error) {
            return callback({error});
        }
        
        console.log(user)

        socket.emit('message', { user: 'admin', text : `${user.name} welcome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`});
        


        socket.join(user.room);

        callback(); 
    })


    socket.on('sendMessage', (message, callback) => {
        const user= getUser(socket.id);
        
        io.to('user.room').emit('message', { user:user.name, text: message })
        
        
        callback(); 
    })

    
    // when user leave realtime connection
    socket.on('disconnect', (callback) => {
        console.log('User left')
    });
})


/* Routers */
app.use(router); 


/** Server is listening */
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))