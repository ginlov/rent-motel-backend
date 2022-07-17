import { Expose } from 'class-transformer';

export class AddressDto {
  @Expose()
  id: string;

  @Expose()
  city: string;

  @Expose()
  district: string;

  @Expose()
  ward: string;

  @Expose()
  detail: string;
}
