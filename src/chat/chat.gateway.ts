import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageBodyDto } from './dto/message-body.dto';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: MessageBodyDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(data);

    // await this.chatService.create({
    //   data: {
    //     sender: {
    //       connect: {
    //         id: '',
    //       },
    //     },
    //     receiver: {
    //       connect: {
    //         id: '',
    //       },
    //     },
    //   },
    // });

    this.server.to(client.id).emit('message', data.id);
  }
}
