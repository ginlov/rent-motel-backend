import { Gender, Role } from 'src/common/constants';
export declare class AuthRegisterDto {
    email: string;
    password: string;
    phone: string;
    gender: Gender;
    city: string;
    district: string;
    ward: string;
    detail: string;
    role: Role;
}
