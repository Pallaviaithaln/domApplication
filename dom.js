const list = document.querySelector('.user-list');
const loginDiv = document.querySelector('.login-wrap');
const input = document.querySelector('input');
const button = document.querySelector('button');
const error = document.createElement('div');
button.onclick = function () {
    let myItem = input.value;
    if (myItem) {
        input.value = '';
        // console.log(typeof (myItem), "myItem");
        const listItem = document.createElement('div');
        const listText = document.createElement('span');
        const listBtn = document.createElement('button');

        listItem.appendChild(listText);
        listText.textContent = myItem;
        listItem.appendChild(listBtn);
        listBtn.textContent = 'Accept';
        list.appendChild(listItem);
        loginDiv.style.display = 'none';
        list.style.display = 'block';

        listBtn.onclick = function (e) {
            var notifications = document.createElement('span');
            notifications.textContent = " request sent";
            // listText.appendChild(notifications);
            listItem.appendChild(listText);
            listItem.appendChild(notifications);
            listItem.removeChild(listBtn);
            console.log(e);
            // list.removeChild(listItem);
        }
        listText.onclick = function () {
            var chatDisplay = document.querySelector('.users-wrap');
            chatDisplay.style.display = 'block';
            console.log(this.textContent, "chat Display");
            const currentUser = document.createElement('div');
            currentUser.innerHTML = this.textContent;
            chatDisplay.append(currentUser);

            listItem.style.display = 'none';
            const sendMsgBtn = document.querySelector('#sendBtn');
            const textMsg = document.querySelector('#sendText');
            if (textMsg) {
                sendMsgBtn.onclick = function () {
                    event.preventDefault();
                    const msgBody = document.querySelector('.msg-body');
                    const replySideDiv = document.createElement('div');
                    replySideDiv.className = 'reply-side';
                    const msgWrap = document.createElement('div');
                    msgWrap.className = 'msg-wrap';
                    var toMsg = document.createElement('div');
                    toMsg.class = "msg";
                    replySideDiv.appendChild(msgWrap);
                    toMsg.textContent = textMsg.value;
                    msgWrap.appendChild(toMsg);
                    msgBody.appendChild(replySideDiv);
                    console.log("sendMsgBtn");
                }
            }

        }
    }
    else {
        alert("please enter input");
    }
}