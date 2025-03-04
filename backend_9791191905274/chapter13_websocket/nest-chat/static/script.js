const socket = io('http://localhost:3000/chat');
const nickname = prompt('Please enter your nickname!');

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