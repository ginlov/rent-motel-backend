import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AddressesService } from '../addresses/addresses.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private rolesService;
    private addressesService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, rolesService: RolesService, addressesService: AddressesService);
    register(userRegisterData: AuthRegisterDto): Promise<import("../users/user.entity").User>;
    login(userLoginData: AuthLoginDto): Promise<{
        accessToken: string;
        expiresIn: string;
    }>;
}
