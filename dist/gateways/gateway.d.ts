import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './gateway.service';
export declare class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    readonly socketService: SocketService;
    server: Server;
    constructor(socketService: SocketService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleChangeStatus(body: boolean): void;
}
