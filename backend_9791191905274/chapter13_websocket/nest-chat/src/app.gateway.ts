import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat'})
export class ChatGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('message')
    handleMessage(socket: Socket, data: any): void {
        const { message, nickname } = data;
        console.log(data);
        // this.server.emit('message', `client-${socket.id.substring(0, 4)} : ${data}`,);
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }
}