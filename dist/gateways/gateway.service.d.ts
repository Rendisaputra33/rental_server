import { Server } from 'socket.io';
export declare class SocketService {
    private server;
    setServer(params: Server): void;
    getServer(): Server;
    sendUpdateStatus({ status, code }: {
        status: any;
        code: any;
    }): void;
}
