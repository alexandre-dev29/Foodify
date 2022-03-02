import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Address,
  AddressService,
  CreateAddressInput,
  UpdateAddressInput,
} from '@food-delivery/address';

@Resolver(() => Address)
export class RestauAddressResolver {
  constructor(private readonly adressService: AddressService) {}

  @Mutation(() => Address)
  createRestauAddress(
    @Args('createRestauAddressInput')
    createRestauAddressInput: CreateAddressInput
  ) {
    return this.adressService.save(createRestauAddressInput);
  }

  @Query(() => [Address], { name: 'restauAddresses' })
  async findAll() {
    return (await this.adressService.findAll()).filter(
      (a) => a.restauId != null
    );
  }

  @Query(() => Address, { name: 'restauAddress' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.adressService.findById(id);
  }

  @Mutation(() => Address)
  updateRestauAddress(
    @Args('adresseId') addressId: string,
    @Args('updateRestauAddressInput')
    updateRestauAddressInput: UpdateAddressInput
  ) {
    return this.adressService.updateAdress(addressId, updateRestauAddressInput);
  }

  @Mutation(() => Address)
  removeRestauAddress(@Args('id', { type: () => String }) id: string) {
    return this.adressService.delete(id);
  }
}
