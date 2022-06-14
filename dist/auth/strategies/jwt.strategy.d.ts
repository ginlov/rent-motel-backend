import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/user.entity';
declare type JwtPayload = Pick<User, 'id' | 'roleId'> & {
    iat: number;
    exp: number;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
