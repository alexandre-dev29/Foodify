import {
  CreateRestaurantInput,
  RepositoryData,
  Restaurant,
} from '@food-delivery/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@food-delivery/utility';
import {
  GlobalAddressService,
  UpdateAddressInput,
} from '@food-delivery/address';

@Injectable()
export class RestaurantService implements RepositoryData<Restaurant> {
  constructor(
    private prismaService: PrismaService,
    private restauAddressService: GlobalAddressService
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
    { latitude, longitude, address, commune }: UpdateAddressInput
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
        userId: null,
      });

      return this.prismaService.restaurant.update({
        where: { restauId: currentRestaurant.restauId },
        data: { restauAddressId: createdAddress.addressId },
      });
    }
  }
}
