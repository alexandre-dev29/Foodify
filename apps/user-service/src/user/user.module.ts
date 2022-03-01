import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LoginResponse } from '@food-delivery/shared-types';
import { AddressService } from '../address/address.service';
import { UserRoleService } from '../user-role/user-role.service';
import { PrismaService, TwilioService } from '@food-delivery/utility';

@Module({
  imports: [],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    LoginResponse,
    AddressService,
    UserRoleService,
    TwilioService,
  ],
})
export class UserModule {}
