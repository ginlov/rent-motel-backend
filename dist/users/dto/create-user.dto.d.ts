import { Gender } from 'src/common/constants';
export declare class CreateUserDto {
    email: string;
    password: string;
    phone: string;
    gender: Gender;
    birthday: Date;
    addressId: string;
    roleId: string;
}
