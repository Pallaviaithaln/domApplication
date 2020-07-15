const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/dom.html');
});
app.use(express.static(path.join(__dirname, 'public')));

/*

list of users => all socket.id
onineUsers => list of users - current user

*/

var users = [];
io.on('connection', function (socket) {
    socket.on('userJoined', (joinedUser => {
        userObj = {};
        userObj['name'] = joinedUser;
        userObj['id'] = socket.id;
        socket.user = userObj;
        users.push(userObj);
        socket.on('createRoom', (roomData => {
            var roomName = 'pals';
            let receiverId = roomData.id;
            var socket1 = io.of("/").connected[receiverId];
            socket.join(roomName);
            socket1.join(roomName);
            socket.on('sendMessage', function (message) {
                console.log('msgs', message, roomName);
                io.in(roomName).emit('personalChatMsg', message);
            });
            // io.in(roomName).emit('personalChatMsg', roomName);
            // io.to(listOfUsersInGroup).emit("personalChatMsg", roomName);
        }));
        
        updateClients();
    }));
    socket.on('notify', (user => {
        socket.to(user).emit('notification', user);
    }));


    socket.on('disconnect', (() => {
        console.log('Disconnected');
        for (var i = 0; i < users.length; i++) {
            if (users[i] === socket.user) {
                delete users[i];
            }
        }
        updateClients();
    }));
    function updateClients() {
        users = users.filter(u => { return (u.name && u.id) != null; });
        console.log(users, "inside update");
        io.sockets.emit('update', users);
    }

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})