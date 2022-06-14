import { AddressDto } from '../../addresses/dto/address.dto';
import { RoleDto } from '../../roles/dto/role.dto';
export declare class UserDto {
    email: string;
    phone: string;
    gender: string;
    birthday: Date;
    address: AddressDto;
    role: RoleDto;
}
