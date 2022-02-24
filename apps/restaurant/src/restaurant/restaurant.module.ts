import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  FirebaseService,
  LoginResponse,
  PrismaService,
  ResponseAction,
} from '@food-delivery/shared-types';
import { RestauAddressService } from '../restau-address/restau-address.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT_ACCESS_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    RestaurantResolver,
    RestaurantService,
    LoginResponse,
    PrismaService,
    RestauAddressService,
    ResponseAction,
    FirebaseService,
  ],
})
export class RestaurantModule {}
