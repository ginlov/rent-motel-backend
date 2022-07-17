import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { AddressesService } from '../addresses/addresses.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private addressesService: AddressesService,
  ) {}

  async register(registerDto: RegisterDto) {
    // check email is valid
    const userExisted = await this.usersService.findOne({
      email: registerDto.email,
    });
    if (userExisted) {
      throw new BadRequestException('Email address already exists.');
    }

    // find role id
    const role = await this.rolesService.findOne({
      name: registerDto.role,
    });

    // hash password and create user
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
        address: {
          create: registerDto.address,
        },
        role: {
          connect: {
            id: role.id,
          },
        },
      },
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const userExisted = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!userExisted) {
      throw new UnauthorizedException('Email address is not correct.');
    }

    if (!(await bcrypt.compare(loginDto.password, userExisted.password)))
      throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({
      id: userExisted.id,
    });

    return token;
  }
}
