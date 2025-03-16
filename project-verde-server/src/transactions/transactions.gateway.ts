import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TransactionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendStatusUpdate(buyerId: string, transactionId: Types.ObjectId | unknown, status: string) {
    this.server.to(buyerId).emit('transactionUpdate', { transactionId, status });
  }
}
