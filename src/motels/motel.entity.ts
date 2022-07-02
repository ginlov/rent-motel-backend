import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../addresses/address.entity';
import { MotelUtility } from '../motel-utility/motel-utility.entity';
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

  @JoinColumn({ name: 'motel_utility_id' })
  @OneToMany(() => MotelUtility, (motelUtility) => motelUtility.id)
  motelUtility: MotelUtility;

  @Column({ type: 'float', name: 'water_price' })
  waterPrice: number;

  @Column({ type: 'float', name: 'electric_price' })
  electricPrice: number;

  @Column({ type: 'float' })
  square: number;

  @Column({ type: 'varchar' })
  summary: string;

  @Column({ type: 'varchar' })
  description: string;
}
