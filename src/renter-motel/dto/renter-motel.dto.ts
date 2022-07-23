import { RenterMotelStatusEnum } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class RenterMotelDto {
  @Expose()
  id: string;

  @Expose()
  status: RenterMotelStatusEnum;

  @Expose()
  @Type(() => UserDto)
  renter: UserDto;
}
