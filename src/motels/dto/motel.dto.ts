import { Expose, Type } from 'class-transformer';
import { AddressDto } from '../../addresses/dto/address.dto';

import { UserDto } from '../../users/dto/user.dto';

export class MotelDto {
  @Expose()
  id: string;

  @Expose()
  price: number;

  @Expose()
  electricPrice: number;

  @Expose()
  waterPrice: number;

  @Expose()
  square: number;
  @Expose()
  summary: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => AddressDto)
  address: AddressDto;

  @Expose()
  @Type(() => UserDto)
  owner: UserDto;
}
