const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {
    ws.send('[Server connection established!]');
    
    ws.on('message', message => {
        ws.send(`[Response from the server] ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected!');
    });
});