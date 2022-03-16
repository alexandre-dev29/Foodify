import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@food-delivery/shared-types';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRole } from '../user-role/entities/user-role.entity';
import {
  Address,
  AddressRecup,
  GlobalAddressService,
} from '@food-delivery/address';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private addressService: GlobalAddressService,
    private userRoleService: UserRoleService
  ) {}

  @Query(() => User)
  getUser(@Args({ name: 'id', type: () => String }) id: string): Promise<User> {
    return this.userService
      .findById(id)
      .then((user) => ({ ...user, password: '' }));
  }
  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll().then((elements) => {
      return elements.map((user) => ({ ...user, password: '' }));
    });
  }

  @ResolveField('address', () => AddressRecup)
  async getAddress(@Parent() user: User): Promise<Address> {
    return this.addressService.findByUserId(user.userId);
  }

  @ResolveField('role', () => UserRole)
  async role(@Parent() user: User): Promise<UserRole> {
    return this.userRoleService.findById(user.userRoleId);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this.userService.findById(reference.id);
  }
}
