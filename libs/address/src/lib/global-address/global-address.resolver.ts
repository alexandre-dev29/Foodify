import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GlobalAddressService } from './global-address.service';
import { PrismaService } from '@food-delivery/utility';
import { User } from '@food-delivery/shared-types';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => Address)
export class GlobalAddressResolver {
  constructor(
    private readonly addressesService: GlobalAddressService,
    private prismaService: PrismaService
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
    return this.prismaService.user.findFirst({
      where: { userId: address.userId },
    });
  }

  @Mutation(() => Address)
  updateRestauAddress(
    @Args('adresseId') addressId: string,
    @Args('updateRestauAddressInput')
    updateRestauAddressInput: UpdateAddressInput
  ) {
    return this.addressesService.updateAdress(
      addressId,
      updateRestauAddressInput
    );
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Address> {
    return this.addressesService.findById(reference.id);
  }
}
