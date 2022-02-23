import { PrismaService, RepositoryData } from '@food-delivery/shared-types';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { RestauAddressService } from '../restau-address/restau-address.service';
import { UpdateRestauAddressInput } from '../restau-address/dto/update-restau-address.input';

@Injectable()
export class RestaurantService implements RepositoryData<Restaurant> {
  constructor(
    private prismaService: PrismaService,
    private restauAddressService: RestauAddressService
  ) {}

  findById(id: string): Promise<Restaurant> {
    return this.prismaService.restaurant.findUnique({
      where: { restauId: id },
    });
  }

  findAll(): Promise<Restaurant[]> {
    return this.prismaService.restaurant.findMany({});
  }

  delete(id: string): Promise<Restaurant> {
    return this.prismaService.restaurant.delete({ where: { restauId: id } });
  }

  save({
    phoneNumber,
    restauName,
    restauDescription,
  }: CreateRestaurantInput): Promise<Restaurant> {
    return this.prismaService.restaurant.create({
      data: {
        phoneNumber,
        restauName,
        restauDescription,
      },
    });
  }

  activateRestaurant(restaurantId: string): Promise<Restaurant> {
    return this.prismaService.restaurant.update({
      where: { restauId: restaurantId },
      data: { isActive: true },
    });
  }

  async updateAddressRestaurant(
    restaurantId: string,
    { latitude, longitude, address, commune }: UpdateRestauAddressInput
  ): Promise<Restaurant | any> {
    const currentRestaurant = await this.prismaService.restaurant.findUnique({
      where: { restauId: restaurantId },
    });
    const foundedOccurrence =
      await this.restauAddressService.findByRestaurantId(restaurantId);
    if (foundedOccurrence) {
      return this.restauAddressService.updateAdress(
        foundedOccurrence.addressId,
        {
          address,
          commune,
          longitude,
          latitude,
        }
      );
    } else {
      const createdAddress = await this.restauAddressService.save({
        address,
        commune,
        longitude,
        latitude,
        restauId: currentRestaurant.restauId,
      });

      return this.prismaService.restaurant.update({
        where: { restauId: currentRestaurant.restauId },
        data: { restauAddressId: createdAddress.addressId },
      });
    }
  }
}
