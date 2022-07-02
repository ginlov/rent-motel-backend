import { Expose, Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MotelDto } from '../../motels/dto/motel.dto';
import { UtilityDto } from '../../utilities/dto/utility.dto';

export class MotelUtilityDto {
  @Expose()
  id: string;

  @Type(() => MotelDto)
  @Expose()
  motel: MotelDto;

  @Type(() => UtilityDto)
  @Expose()
  utility: UtilityDto;

  @Expose()
  status: number;

  @Expose()
  quantity: number;

  @Expose()
  updatedAt: Date;
}
