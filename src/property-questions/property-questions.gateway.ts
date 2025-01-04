import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class PropertyQuestionsGateway {
  @WebSocketServer()
  server: Server;

  notifyNewQuestion(question: any) {
    this.server.emit('newQuestion', question);
  }
}
