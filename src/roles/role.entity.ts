import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role as RoleEnum } from '../common/constants';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RoleEnum })
  name: RoleEnum;
}
