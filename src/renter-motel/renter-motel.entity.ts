import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Motel } from '../motels/motel.entity';
import { User } from '../users/user.entity';

@Entity('renter_motel')
export class RenterMotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'renter_id' })
  @OneToOne(() => User, (user) => user.id)
  renter: User;

  @JoinColumn({ name: 'motel_id' })
  @OneToOne(() => Motel, (motel) => motel.id)
  motel: Motel;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date', default: null })
  endDate: Date;

  @Column({ type: 'float' })
  deposit: number;

  @Column({ type: 'int' })
  status: number;
}
