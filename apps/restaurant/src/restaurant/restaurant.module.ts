import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { ConfigModule } from '@nestjs/config';
import { LoginResponse, ResponseAction } from '@food-delivery/shared-types';
import { FirebaseService, PrismaService } from '@food-delivery/utility';
import { GlobalAddressService } from '@food-delivery/address';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    RestaurantResolver,
    RestaurantService,
    LoginResponse,
    PrismaService,
    GlobalAddressService,
    ResponseAction,
    FirebaseService,
  ],
})
export class RestaurantModule {}
