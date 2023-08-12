import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;

  setServer(params: Server): void {
    this.server = params;
  }

  getServer(): Server {
    return this.server;
  }

  sendUpdateStatus({ status, code }): void {
    this.server.emit('on_change_status_order', { status, code });
  }
}
