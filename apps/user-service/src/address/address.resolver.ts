import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { UserService } from '../user/user.service';
import { User } from '@food-delivery/shared-types';
import {
  Address,
  AddressService,
  CreateAddressInput,
} from '@food-delivery/address';

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private addressesService: AddressService,
    private userService: UserService
  ) {}

  @Query(() => Address)
  getOneAddress(
    @Args({ name: 'id', type: () => String }) id: string
  ): Promise<Address> {
    return this.addressesService.findById(id);
  }

  @Query(() => [Address])
  async getUserAddresses(): Promise<Address[]> {
    return (await this.addressesService.findAll()).filter(
      (a) => a.userId != null
    );
  }

  @Mutation(() => Address)
  addUserAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput
  ): Promise<Address> {
    return this.addressesService.save(createAddressInput);
  }

  @ResolveField('user', () => User)
  getUser(@Parent() address: Address): Promise<User> {
    return this.userService.findById(address.userId);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Address> {
    return this.addressesService.findById(reference.id);
  }
}
