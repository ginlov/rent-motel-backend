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
  @OneToOne(() => Motel, (motel) => motel.id)
  motel: Motel;

  @JoinColumn({ name: 'utility_id' })
  @OneToOne(() => Utility, (utility) => utility.id)
  utility: Utility;

  @Column()
  status: number;

  @Column()
  quantity: number

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
