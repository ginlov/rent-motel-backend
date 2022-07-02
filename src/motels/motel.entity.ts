import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../addresses/address.entity';
import { RenterMotel } from '../renter-motel/renter-motel.entity';
import { User } from '../users/user.entity';

@Entity('motels')
export class Motel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  price: number;

  @JoinColumn({ name: 'address_id' })
  @OneToOne(() => Address, (address) => address.id)
  address: Address;

  @JoinColumn({ name: 'renter_motel_id' })
  @OneToOne(() => RenterMotel, (renterMotel) => renterMotel.id)
  renterMotel: RenterMotel;

  @Column({ type: 'float', name: 'water_price' })
  waterPrice: number;

  @Column({ type: 'float', name: 'electric_price' })
  electricPrice: number;

  @Column({ type: 'varchar' })
  summary: string;

  @Column({ type: 'varchar' })
  description: string;
}
