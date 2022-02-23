import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environment } from '../environments/environment';
import {
  LoginResponse,
  PrismaService,
  TwilioSharedService,
} from '@food-delivery/shared-types';
import { JwtModule } from '@nestjs/jwt';
import { AddressService } from '../address/address.service';
import { UserRoleService } from '../user-role/user-role.service';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT_ACCESS_KEY'),
      }),
      inject: [ConfigService],
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    LoginResponse,
    AddressService,
    UserRoleService,
    TwilioSharedService,
  ],
})
export class UserModule {}
