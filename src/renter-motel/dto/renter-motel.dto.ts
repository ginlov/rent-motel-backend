import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { MotelDto } from '../../motels/dto/motel.dto';
import { Motel } from '../../motels/motel.entity';
import { UserDto } from '../../users/dto/user.dto';

export class RenterMotelDto {
  @Expose()
  id: string;

  @Type(() => UserDto)
  @Expose()
  renter: UserDto;

  @Type(() => MotelDto)
  @Expose()
  motel: Motel;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  deposit: number;

  @Expose()
  status: number;
}
