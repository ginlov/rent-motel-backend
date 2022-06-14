import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity('chat_histories')
export class ChatHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'sender_id' })
  @OneToOne((type) => User)
  senderId: string;

  @JoinColumn({ name: 'receiver_id' })
  @OneToOne((type) => User)
  receiverId: string;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
