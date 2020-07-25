import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string'; 
import io from 'socket.io-client'; 

let socket; 

const Chat = ({location}) => {

    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 
    const ENDPOINT = 'localhost:5000'; 

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);

        socket.emit('join_khalil', { name, room }, () => {
           
        })
        // socket.emit('join_khalil', {name:name, room:room}, ({error}) => {
        //      console.log(error)
        //})
        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search]);




    return (
        <div>
            <h1>Chat</h1>
            

            <p>Username: {name}</p>
            <p>Room: {room}</p>

            <p>
                <Link to='/'>Home</Link>
            </p>
        </div>
    );
       
}

export default Chat; 