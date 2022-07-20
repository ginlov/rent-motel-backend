import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { AddressesModule } from './addresses/addresses.module';
import { MotelsModule } from './motels/motels.module';
import { AwsModule } from './aws/aws.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { MotelUtilityModule } from './motel-utility/motel-utility.module';
import { RenterMotelModule } from './renter-motel/renter-motel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    RolesModule,
    AddressesModule,
    MotelsModule,
    AwsModule,
    UtilitiesModule,
    MotelUtilityModule,
    RenterMotelModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
