import { Expose, Transform, Type } from 'class-transformer';
import { AddressDto } from '../../addresses/dto/address.dto';
import { Role } from '../../common/constants';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { RoleDto } from '../../roles/dto/role.dto';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  gender: string;

  @Expose()
  birthday: Date;

  @Type(() => AddressDto)
  @Expose()
  address: AddressDto;

  @Type(() => RoleDto)
  @Expose()
  role: RoleDto;
}
