import { Expose, Type } from 'class-transformer';
import { AddressDto } from '../../addresses/dto/address.dto';

import { UserDto } from '../../users/dto/user.dto';
import { UtilityDto } from '../../utilities/dto/utility.dto';

export class MotelUtilityDto {
  @Expose()
  id: string;

  @Expose()
  status: string;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UtilityDto)
  utility: UtilityDto;

  @Expose()
  quantity: number;
}
