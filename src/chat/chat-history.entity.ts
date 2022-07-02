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
  @OneToOne(() => User, (user) => user.id)
  sender: User;

  @JoinColumn({ name: 'receiver_id' })
  @OneToOne(() => User, (user) => user.id)
  receiver: User;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
