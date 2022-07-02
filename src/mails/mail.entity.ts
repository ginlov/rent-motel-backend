import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('mails')
export class Mail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'receiver_id' })
  @OneToOne(() => User, (user) => user.id)
  receiver: User;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;
}
