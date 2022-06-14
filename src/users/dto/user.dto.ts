import { Expose, Transform } from 'class-transformer';
import { Role } from '../../common/constants';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  gender: string;

  @Expose()
  birthday: Date;

  @Expose()
  role: Role;
}
