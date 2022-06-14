import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Motel } from '../motels/motel.entity';
import { Utility } from '../utilities/utility.entity';

@Entity('motel_utility')
export class MotelUtility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'motel_id' })
  @OneToOne((type) => Motel)
  motelId: string;

  @JoinColumn({ name: 'utility_id' })
  @OneToOne((type) => Utility)
  utilityId: string;

  @Column()
  status: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
