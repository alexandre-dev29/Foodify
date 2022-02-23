import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestauAddressInput } from '../restau-address/dto/update-restau-address.input';
import { RestauAddress } from '../restau-address/entities/restau-address.entity';
import { RestauAddressService } from '../restau-address/restau-address.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly restauAddressService: RestauAddressService
  ) {}

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput
  ) {
    return this.restaurantService.save(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'getAllRestaurants' })
  getAllRestaurants() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'getOneRestaurant' })
  getOneRestaurant(@Args('id', { type: () => String }) id: string) {
    return this.restaurantService.findById(id);
  }

  @Mutation(() => Restaurant)
  removeRestaurant(@Args('id', { type: () => String }) id: string) {
    return this.restaurantService.delete(id);
  }

  @ResolveField('address', () => RestauAddress)
  async role(@Parent() restaurant: Restaurant): Promise<RestauAddress> {
    return this.restauAddressService.findById(restaurant.restauAddressId);
  }

  @Mutation(() => Restaurant)
  updateRestaurantAddress(
    @Args('restaurantId', { type: () => String }) restaurantId: string,
    @Args('addressInfo', { type: () => UpdateRestauAddressInput })
    addressInformations: UpdateRestauAddressInput
  ): Promise<Restaurant> {
    return this.restaurantService.updateAddressRestaurant(
      restaurantId,
      addressInformations
    );
  }
}
