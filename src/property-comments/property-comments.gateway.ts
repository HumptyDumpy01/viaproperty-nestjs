import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PropertyCommentsGateway {
  @WebSocketServer()
  server: Server;

  notifyNewReply(reply: any) {
    this.server.emit(`newReply`, reply);
  }
}
