import { Expose, Transform } from 'class-transformer';
import { AddressDto } from '../../addresses/dto/address.dto';

export class MotelDto {
  @Expose()
  id: string;

  @Expose()
  price: number;

  @Expose()
  address: AddressDto;

  @Expose()
  waterPrice: number;

  @Expose()
  electricPrice: number;
}
