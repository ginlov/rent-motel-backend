import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../addresses/address.entity';

@Entity('motels')
export class Motel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  price: number;

  @JoinColumn({ name: 'address_id' })
  @OneToOne((type) => Address)
  addressId: string;

  @Column({ type: 'float', name: 'water_price' })
  waterPrice: number;

  @Column({ type: 'float', name: 'electric_price' })
  electricPrice: number;
}
