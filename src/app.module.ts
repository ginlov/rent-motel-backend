import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './config/auth.config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MotelsModule } from './motels/motels.module';
import { RolesModule } from './roles/roles.module';
import { AddressesModule } from './addresses/addresses.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { RenterMotelModule } from './renter-motel/renter-motel.module';
import { MotelUtilityModule } from './motel-utility/motel-utility.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    MotelsModule,
    AddressesModule,
    UtilitiesModule,
    ChatModule,
    RenterMotelModule,
    MotelUtilityModule,
    AwsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
