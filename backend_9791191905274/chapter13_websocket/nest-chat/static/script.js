const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('Please enter your nickname!');

let currentRoom = '';

socket.on('connect', () => {
    console.log('connected');
});

function sendMessage() {
    if (currentRoom === '') {
        alert('Please select a room.');
        return;
    }
    const message = $('#message').val();
    const data = { message, nickname, room: currentRoom };
    
    $('#chat').append(`<div>Me : ${message}</div>`)
    roomSocket.emit('message', data);
    return false;
}

socket.on('message', (message) => {
    $('#chat').append(`<div>${message}</div>`);
});


function createRoom() {
    const room = prompt('Please enter the name of the room to create!');
    roomSocket.emit('createRoom', { room, nickname });
}

socket.on('notice', (data) => {
    $('#notice').append(`<div>${data.message}</div>`);
})

roomSocket.on('message', (data) => {
    console.log(data);
    $('#chat').append(`<div>${data.message}</div>`);
});

roomSocket.on("rooms", (data) => {
    console.log(data);
    $('#rooms').empty();
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
    });
});


function joinRoom(room) {
    roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
    $('#chat').html('');
    currentRoom = room;
}