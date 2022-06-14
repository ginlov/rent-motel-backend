import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utilities')
export class Utility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
