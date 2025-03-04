const socket = io('http://localhost:3000/chat');
const rooomSocket = io('http://localhost:3000/room');
const nickname = prompt('Please enter your nickname!');

let currentRoom = '';

socket.on('connect', () => {
    console.log('connected');
});

function sendMessage() {
    const message = $('#message').val();
    $('#chat').append(`<div>Me : ${message}</div>`)
    socket.emit('message', { message, nickname });
}

socket.on('message', (message) => {
    $('#chat').append(`<div>${message}</div>`);
});


function createRoom() {
    const room = prompt('Please enter the name of the room to create!');
    rooomSocket.emit('createRoom', { room, nickname });
}

rooomSocket.on("rooms", (data) => {
    console.log(data);
    $('#rooms').empty();
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
    });
});