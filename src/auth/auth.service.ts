import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('AUTH_SALT_ROUND')),
    );
  }

  async comparePassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
  }
}
