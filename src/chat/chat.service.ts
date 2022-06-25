import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ChatHistory } from './chat-history.entity';
import { CreateChatHistoryDto } from './dto/create-chat-history.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatHistory)
    private chatRepository: Repository<ChatHistory>,
    private usersService: UsersService,
  ) {}

  async create(senderId: string, messageData: Partial<CreateChatHistoryDto>) {
    const senderExisted = await this.usersService.findOne({
      where: {
        id: messageData.receiverId,
      },
    });
    if (!senderExisted) {
      throw new NotFoundException('Receiver not found.');
    }

    return await this.chatRepository.save(
      this.chatRepository.create({
        ...messageData,
        createdAt: new Date(),
      }),
    );
  }
}
