var socket = io();
const list = document.querySelector('.user-list');
const loginDiv = document.querySelector('.login-wrap');
const input = document.querySelector('input');
const button = document.querySelector('button');
const error = document.createElement('div');

button.onclick = function () {
    event.preventDefault();
    let userInput = input.value;
    if (userInput) {
        var users = userInput;
        input.value = '';
        loginDiv.style.display = 'none';
        list.style.display = 'block';

        socket.emit('userJoined', users);
        console.log(users, 'current user');

        socket.on('update', function (users) {
            list.innerHTML = '';
            var userList = users.filter(u => { return (u.name && u.id) != null; });
            console.log('user here', userList);
            for (var i = 0; i < userList.length; i++) {
                var listItem = document.createElement('div');
                var listText = document.createElement('span');
                var listBtn = document.createElement('button');
                listItem.appendChild(listText);
                listText.textContent = userList[i].name;
                listText.value = userList[i];
                listItem.appendChild(listBtn);
                listBtn.textContent = 'Request';
                listBtn.value = userList[i].id;
                list.appendChild(listItem);
                listBtn.onclick = function () {
                    var notifications = document.createElement('span');
                    notifications.textContent = " request sent" + this.value;
                    // listText.appendChild(notifications);
                    listItem.appendChild(listText);
                    listItem.appendChild(notifications);
                    listItem.removeChild(listBtn);
                    socket.emit('notify', this.value);

                    // list.removeChild(listItem);
                }
                listText.onclick = function () {
                    console.log(this.value, " clicked");

                    socket.emit('createRoom', this.value);
                    var chatDisplay = document.querySelector('.users-wrap');
                    chatDisplay.style.display = 'block';
                    console.log(this.textContent, "chat Display");
                    const currentUser = document.createElement('div');

                    listItem.style.display = 'none';
                    const sendMsgBtn = document.querySelector('#sendBtn');
                    const textMsg = document.querySelector('#sendText');
                    sendMsgBtn.onclick = function () {
                        event.preventDefault();
                        socket.emit('sendMessage', textMsg.value);
                        console.log('after send', textMsg.value);

                    };

                    socket.on('personalChatMsg', function (msg) {
                        console.log(msg);
                        const msgBody = document.querySelector('.msg-body');
                        const replySideDiv = document.createElement('div');
                        replySideDiv.className = 'reply-side';
                        const msgWrap = document.createElement('div');
                        msgWrap.className = 'msg-wrap';
                        var toMsg = document.createElement('div');
                        toMsg.class = "msg";
                        replySideDiv.appendChild(msgWrap);
                        toMsg.textContent = msg;
                        msgWrap.appendChild(toMsg);
                        msgBody.appendChild(replySideDiv);

                    });

                }

            }
            socket.on('notification', function (user) {
                var notifications = document.createElement('span');
                notifications.textContent = " requested by" + user;
                listItem.appendChild(notifications);
                listBtn.textContent = "Accept";
            });
        });

    }
    else {
        alert("please enter input");
    }
}