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


@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
    constructor(private readonly chatGateway: ChatGateway) {}

    rooms = [] as string[];

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('createRoom')
    handleMessage(@MessageBody() data) {
        const { nickname, room } = data;

        this.chatGateway.server.emit('notice', {
            message: `User [${nickname}] created the room [${room}].`
        });
    
        this.rooms.push(room);
        this.server.emit('rooms', this.rooms);
    }
    
    
    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket, data) {
        const { nickname, room, toLeaveRoom } = data;
        socket.leave(toLeaveRoom);
    
        // if (toLeaveRoom) {
        //     socket.leave(toLeaveRoom);
        //     console.log(`Client left room: ${toLeaveRoom}`);
        // }
    
        this.chatGateway.server.emit('notice', {
            message: `User [${nickname}] joined the room [${room}].`
        });
        socket.join(room);
        console.log(`Client joined room: ${room}`);
        console.log('Current rooms:', socket.rooms);
    }


    @SubscribeMessage('message')
    handleMessageToRoom(socket: Socket, data) {
        const { nickname, room, message } = data;
        console.log(data);
        socket.to(room).emit('message', {
            message: `${nickname}: ${message}`,
        });
    }
}