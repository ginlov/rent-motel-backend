import { BadGatewayException, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';
import { MessageContentDto } from './dto/message-content.dto';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatGateway {
  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    data: MessageContentDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const senderExisted = await this.usersService.findOne({
      id: data.senderId,
    });
    if (!senderExisted) {
      throw new BadGatewayException('Sender is invalid.');
    }
    const receiverExisted = await this.usersService.findOne({
      id: data.receiverId,
    });

    if (!receiverExisted) {
      throw new BadGatewayException('Receiver is invalid.');
    }

    const chat = await this.chatService.create({
      data: {
        message: data.message,
        sender: {
          connect: {
            id: data.senderId,
          },
        },
        receiver: {
          connect: {
            id: data.receiverId,
          },
        },
      },
    });

    this.server.to(client.id).emit('message', {
      message: data.message,
    });
  }
}
