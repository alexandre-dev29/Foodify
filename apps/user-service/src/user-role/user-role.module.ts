import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleResolver } from './user-role.resolver';
import { UserService } from '../user/user.service';
import { PrismaService, TwilioService } from '@food-delivery/utility';

@Module({
  imports: [],
  providers: [
    UserRoleResolver,
    UserRoleService,
    UserService,
    PrismaService,
    TwilioService,
  ],
})
export class UserRoleModule {}
