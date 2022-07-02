import { Expose, Transform, Type } from 'class-transformer';
import { AddressDto } from '../../addresses/dto/address.dto';
import { MotelUtilityDto } from '../../motel-utility/dto/motel-utility.dto';
import { RenterMotelDto } from '../../renter-motel/dto/renter-motel.dto';
import { UserDto } from '../../users/dto/user.dto';

export class MotelDto {
  @Expose()
  id: string;

  @Expose()
  price: number;

  @Type(() => AddressDto)
  @Expose()
  address: AddressDto;

  @Type(() => RenterMotelDto)
  @Expose()
  renterMotel: RenterMotelDto;

  @Type(() => MotelUtilityDto)
  @Expose()
  motelUtility: MotelUtilityDto;

  @Expose()
  status: number;

  @Expose()
  waterPrice: number;

  @Expose()
  electricPrice: number;

  @Expose()
  square: number;

  @Expose()
  summary: string;

  @Expose()
  description: string;
}
