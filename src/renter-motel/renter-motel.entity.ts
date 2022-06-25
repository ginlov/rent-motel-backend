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
  @OneToOne((type) => User)
  renterId: string;

  @JoinColumn({ name: 'motel_id' })
  @OneToOne((type) => Motel)
  motelId: string;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date', default: null })
  endDate: Date;

  @Column({ type: 'float' })
  deposit: number;
}
