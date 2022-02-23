import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RestauAddressService } from './restau-address.service';
import { RestauAddress } from './entities/restau-address.entity';
import { CreateRestauAddressInput } from './dto/create-restau-address.input';
import { UpdateRestauAddressInput } from './dto/update-restau-address.input';

@Resolver(() => RestauAddress)
export class RestauAddressResolver {
  constructor(private readonly restauAddressService: RestauAddressService) {}

  @Mutation(() => RestauAddress)
  createRestauAddress(
    @Args('createRestauAddressInput')
    createRestauAddressInput: CreateRestauAddressInput
  ) {
    return this.restauAddressService.save(createRestauAddressInput);
  }

  @Query(() => [RestauAddress], { name: 'restauAddresses' })
  findAll() {
    return this.restauAddressService.findAll();
  }

  @Query(() => RestauAddress, { name: 'restauAddress' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.restauAddressService.findById(id);
  }

  @Mutation(() => RestauAddress)
  updateRestauAddress(
    @Args('adresseId') addressId: string,
    @Args('updateRestauAddressInput')
    updateRestauAddressInput: UpdateRestauAddressInput
  ) {
    return this.restauAddressService.updateAdress(
      addressId,
      updateRestauAddressInput
    );
  }

  @Mutation(() => RestauAddress)
  removeRestauAddress(@Args('id', { type: () => String }) id: string) {
    return this.restauAddressService.delete(id);
  }
}
