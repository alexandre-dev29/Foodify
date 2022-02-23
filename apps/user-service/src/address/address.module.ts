import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { UserService } from '../user/user.service';
import {
  PrismaService,
  TwilioSharedService,
} from '@food-delivery/shared-types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT_ACCESS_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AddressResolver,
    AddressService,
    UserService,
    PrismaService,
    TwilioSharedService,
  ],
})
export class AddressModule {}
