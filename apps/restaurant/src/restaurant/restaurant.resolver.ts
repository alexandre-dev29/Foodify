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
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { FirebaseService } from '@food-delivery/shared-types';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly restauAddressService: RestauAddressService,
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

  @ResolveField('address', () => RestauAddress, { nullable: true })
  async address(@Parent() restaurant: Restaurant): Promise<RestauAddress> {
    return this.restauAddressService.findByRestaurantId(restaurant.restauId);
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
}
