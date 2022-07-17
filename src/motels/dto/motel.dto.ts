import { Address } from '@prisma/client';
import { Expose } from 'class-transformer';

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
  address: Address;

  @Expose()
  owner: UserDto;
}
