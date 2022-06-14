import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { IResponse } from '../common/interfaces';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userRegisterData: AuthRegisterDto): Promise<IResponse>;
    login(userLoginData: AuthLoginDto): Promise<IResponse>;
}
