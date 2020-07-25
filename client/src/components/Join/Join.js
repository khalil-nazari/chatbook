import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Join.css'

const Join = () => {

    // useState hook 
    const [username, setUsername] = useState(''); 
    const [room, setRoom] = useState('');

    const joinClickHandler = (e) => {
        if (!username || !room) 
            e.preventDefault() 
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer"> 
                <h1 className="heading">Join</h1>
        
                <div>
                    <input type="text" 
                        name="username" 
                        className="joinInput" 
                        placeholder="Username" 
                        onChange={e => setUsername(e.target.value)} 
                    />
                </div>

                <div>
                    <input type="text" 
                        name="room" 
                        className="joinInput mt-20" 
                        placeholder="Room" 
                        onChange={e => setRoom(e.target.value)} 
                    />
                </div>
 
                <Link onClick={joinClickHandler} to={`/chat?name=${username}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}


export default Join;