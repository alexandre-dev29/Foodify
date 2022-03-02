import { Module } from '@nestjs/common';
import { AddressResolver } from './address.resolver';
import { UserService } from '../user/user.service';
import {
  PrismaService,
  TwilioService,
  UtilityModule,
} from '@food-delivery/utility';
import { AddressModule, AddressService } from '@food-delivery/address';

@Module({
  imports: [UtilityModule, AddressModule],
  providers: [
    AddressResolver,
    AddressService,
    UserService,
    PrismaService,
    TwilioService,
  ],
})
export class UserAddressModule {}
