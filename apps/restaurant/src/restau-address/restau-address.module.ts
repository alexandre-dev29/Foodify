import { Module } from '@nestjs/common';
import { RestauAddressResolver } from './restau-address.resolver';
import { PrismaService } from '@food-delivery/utility';
import { AddressService } from '@food-delivery/address';

@Module({
  providers: [RestauAddressResolver, AddressService, PrismaService],
})
export class RestauAddressModule {}
