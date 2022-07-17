import { Expose, Type } from 'class-transformer';

export class RoleDto {
  @Expose()
  name: string;
}
