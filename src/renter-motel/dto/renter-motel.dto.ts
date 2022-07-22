import { RenterMotelStatusEnum } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class RenterMotelDto {
  @Expose()
  id: string;

  @Expose()
  status: RenterMotelStatusEnum;
}
