import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserRoleService } from './user-role.service';
import { UserRole } from './entities/user-role.entity';
import { UserService } from '../user/user.service';
import { User } from '@food-delivery/shared-types';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(
    private readonly userRoleService: UserRoleService,
    private userService: UserService
  ) {}

  @Mutation(() => UserRole)
  createUserRole(@Args('userRole') userRole: string) {
    return this.userRoleService.save(userRole);
  }

  @Query(() => [UserRole], { name: 'roles' })
  roles() {
    return this.userRoleService.findAll();
  }

  @Query(() => UserRole, { name: 'role' })
  role(@Args('id', { type: () => String }) id: string) {
    return this.userRoleService.findById(id);
  }

  @Mutation(() => UserRole)
  removeUserRole(@Args('id', { type: () => String }) id: string) {
    return this.userRoleService.delete(id);
  }

  @ResolveField('users', () => [User])
  async users(@Parent() userRole: UserRole): Promise<User[]> {
    const allUsers = (await this.userService.findAll()) as User[];
    return allUsers.filter(
      (currentUser) => currentUser.userRoleId == userRole.roleId
    );
  }
}
