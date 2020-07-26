const users = []; 


// Add new user 
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase(); 
    room = room.trim().toLowerCase(); 

    const existingUser = users.find((user) => user.room === room && user.name === name)
    if(existingUser) {
        return { error : 'Username is taken'};
    }

    const user = { id, name, room }
    users.push(user)
    return { user }
}


// Remove user from the room
const removeUser = (id) => {
    // Find the index of the id
    const index = users.findIndex((user) => user.id === id);

    // if the id index exist in the array remove it. 
    if(index !== -1) {
        return users.splice(index, 1)[0]
    } 
} 


// get user by id
const getUser = (id) => users.find((user) => user.id === id); 


// get user in the room
const getUserInRoom = (room) => users.filter((user) => user.room === room );


// export
module.exports = { addUser, removeUser, getUser, getUserInRoom }