import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AddressesService } from '../addresses/addresses.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService,
    private addressesService: AddressesService,
  ) {}

  async register(userRegisterData: AuthRegisterDto) {
    const userExisted = await this.usersService.findOne({
      where: {
        email: userRegisterData.email,
      },
    });
    if (userExisted) {
      throw new ConflictException('Email in use');
    }

    const address = await this.addressesService.create(
      userRegisterData.address,
    );
    const role = await this.rolesService.findOne({
      where: {
        name: userRegisterData.role,
      },
    });

    const hashedPassword = await bcrypt.hash(userRegisterData.password, 12);
    userRegisterData.password = hashedPassword;

    return await this.usersService.create({
      ...userRegisterData,
      addressId: address.id,
      roleId: role.id,
    });
  }

  async login(userLoginData: AuthLoginDto) {
    const user = await this.usersService.findOne({
      where: {
        email: userLoginData.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Account does not exist');
    }
    if (!(await bcrypt.compare(userLoginData.password, user.password)))
      throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({
      id: user.id,
    });

    return {
      accessToken: token,
      expiresIn: this.configService.get('auth.expires'),
    };
  }

  async adminLogin(authLoginDto: AuthLoginDto) {
    const user = await this.usersService.findOne({
      where: {
        email: authLoginDto.email,
      },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Account does not exist');
    }

    if (!(await bcrypt.compare(authLoginDto.password, user.password)))
      throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({
      id: user.id,
    });

    return {
      accessToken: token,
      expiresIn: this.configService.get('auth.expires'),
    };
  }
}
