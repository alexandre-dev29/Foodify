import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { UserService } from '../user/user.service';
import {
  PrismaService,
  TwilioService,
  UtilityModule,
} from '@food-delivery/utility';

@Module({
  imports: [UtilityModule],
  providers: [
    AddressResolver,
    AddressService,
    UserService,
    PrismaService,
    TwilioService,
  ],
})
export class AddressModule {}
