import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantInput, Restaurant } from '@food-delivery/shared-types';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { FirebaseService } from '@food-delivery/utility';
import {
  Address,
  AddressRecup,
  GlobalAddressService,
  UpdateAddressInput,
} from '@food-delivery/address';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly restauAddressService: GlobalAddressService,
    private firebaseService: FirebaseService
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

  @ResolveField('address', () => AddressRecup, { nullable: true })
  async address(@Parent() restaurant: Restaurant): Promise<Address> {
    return this.restauAddressService.findByRestaurantId(restaurant.restauId);
  }

  @Mutation(() => Restaurant)
  updateRestaurantAddress(
    @Args('restaurantId', { type: () => String }) restaurantId: string,
    @Args('addressInfo', { type: () => UpdateAddressInput })
    addressInformations: UpdateAddressInput
  ): Promise<Restaurant> {
    return this.restaurantService.updateAddressRestaurant(
      restaurantId,
      addressInformations
    );
  }

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { filename, createReadStream, mimetype }: FileUpload
  ): Promise<boolean | any> {
    const fileNameNew = this.generateNewFileName(filename);
    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${fileNameNew}`))
        .on('finish', () => resolve(true))
        .on('error', (error) => {
          console.log(error);
          reject(false);
        });
    });
    return await this.firebaseService.uploadProfilePhoto(
      `./uploads/${fileNameNew}`
    );
  }

  generateNewFileName(fileName: string): string {
    return `${Date.now()}.${fileName.substring(fileName.length - 3)}`;
  }

  @Mutation(() => Boolean)
  async activateRestaurant(
    @Args('restaurantId', { type: () => String }) restaurantId: string
  ) {
    return (await this.restaurantService.activateRestaurant(restaurantId))
      .isActive;
  }
}
