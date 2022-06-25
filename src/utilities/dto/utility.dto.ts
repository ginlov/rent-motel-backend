import { Expose } from 'class-transformer';

export class UtilityDto {
  @Expose()
  id: string;
  @Expose()
  type: string;
}
