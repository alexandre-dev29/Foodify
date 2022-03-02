import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LoginResponse } from '@food-delivery/shared-types';
import { UserRoleService } from '../user-role/user-role.service';
import { PrismaService, UtilityModule } from '@food-delivery/utility';
import { AuthModule } from '@food-delivery/auth';
import { GlobalAddressService } from '@food-delivery/address';

@Module({
  imports: [UtilityModule, AuthModule],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    LoginResponse,
    GlobalAddressService,
    UserRoleService,
  ],
})
export class UserModule {}
