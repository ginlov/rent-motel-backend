import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('motels')
export class Motel {
  @Expose()
  id: string;

  @Expose()
  motelId: string;

  @Expose()
  utilityId: string;

  @Expose()
  status: string;

  @Expose()
  updatedAt: Date;
}
