import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Motel } from '../motels/motel.entity';
import { User } from '../users/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'user_id' })
  @OneToOne((type) => User)
  userId: string;

  @JoinColumn({ name: 'motel_id' })
  @OneToOne((type) => Motel)
  motelId: string;

  @Column({ type: 'float' })
  electric_number: number;

  @Column({ type: 'float' })
  water_number: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'timestamp' })
  date: Date;
}
