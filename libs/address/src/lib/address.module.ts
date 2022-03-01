import { Module } from '@nestjs/common';
import { AddressService } from './address/address.service';
import { PrismaService } from '@food-delivery/utility';

@Module({
  controllers: [],
  providers: [AddressService, PrismaService],
  exports: [],
  imports: [AddressModule],
})
export class AddressModule {}
