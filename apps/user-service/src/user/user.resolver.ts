import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from '@food-delivery/shared-types';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRole } from '../user-role/entities/user-role.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private addressService: AddressService,
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

  @Mutation(() => User)
  registerUser(
    @Args('createUserInput')
    { userRole, username, password, phoneNumber }: CreateUserInput
  ): Promise<User> {
    return this.userService
      .save({ username, userRole, password, phoneNumber })
      .then((user) => ({ ...user, password: '' }));
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('phoneNumber') phoneNumber: string,
    @Args('password') password: string
    // @Context() context: any,
  ) {
    return this.userService.loginUser(phoneNumber, password);
  }

  @Mutation(() => Boolean)
  async ConfirmPhoneNumber(
    @Args('phoneNumber') phoneNumber: string,
    @Args('otpCode') otpCode: string
  ) {
    return this.userService.confirmPhoneNumber(phoneNumber, otpCode);
  }
  @Mutation(() => Boolean)
  async AskingForOtpCode(@Args('phoneNumber') phoneNumber: string) {
    return this.userService.askingForOtpCode(phoneNumber);
  }

  @ResolveField('address', () => Address)
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
