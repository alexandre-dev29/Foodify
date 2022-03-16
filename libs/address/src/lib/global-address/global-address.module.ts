import { Module } from '@nestjs/common';
import { GlobalAddressService } from './global-address.service';
import { GlobalAddressResolver } from './global-address.resolver';
import { PrismaService } from '@food-delivery/utility';

@Module({
  providers: [PrismaService, GlobalAddressResolver, GlobalAddressService],
})
export class GlobalAddressModule {}
