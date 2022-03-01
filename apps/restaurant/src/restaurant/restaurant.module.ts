import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { ConfigModule } from '@nestjs/config';
import { LoginResponse, ResponseAction } from '@food-delivery/shared-types';
import { RestauAddressService } from '../restau-address/restau-address.service';
import { FirebaseService, PrismaService } from '@food-delivery/utility';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
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
