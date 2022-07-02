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

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => RenterMotel, (renterMotel) => renterMotel.motel)
  renterMotel: RenterMotel;

  @OneToMany(() => MotelUtility, (motelUtility) => motelUtility.motel)
  motelUtility: MotelUtility[];

  @OneToMany(() => MotelUtility, (motelUtility) => motelUtility.motel)
  status: number;

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
