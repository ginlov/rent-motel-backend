import { Exclude, Expose, Transform } from 'class-transformer';

export class AddressDto {
  @Expose()
  city: string;

  @Expose()
  district: string;

  @Expose()
  ward: string;

  @Expose()
  detail: string;
}
