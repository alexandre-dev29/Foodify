import { Injectable } from '@nestjs/common';
import { CreateRestauAddressInput } from './dto/create-restau-address.input';
import { UpdateRestauAddressInput } from './dto/update-restau-address.input';
import { PrismaService, RepositoryData } from '@food-delivery/shared-types';
import { RestauAddress } from './entities/restau-address.entity';

@Injectable()
export class RestauAddressService implements RepositoryData<RestauAddress> {
  constructor(private prismaService: PrismaService) {}

  updateAdress(
    id: string,
    updateRestauAddressInput: UpdateRestauAddressInput
  ): Promise<RestauAddress> {
    return this.prismaService.restauAddress.update({
      where: { addressId: id },
      data: updateRestauAddressInput,
    });
  }

  delete(id: string): Promise<RestauAddress> {
    return this.prismaService.restauAddress.delete({
      where: { addressId: id },
    });
  }

  findAll(): Promise<RestauAddress[]> {
    return this.prismaService.restauAddress.findMany({});
  }

  findById(id: string): Promise<RestauAddress> {
    return this.prismaService.restauAddress.findUnique({
      where: { addressId: id },
    });
  }

  findByRestaurantId(restaurantId: string): Promise<RestauAddress> {
    return this.prismaService.restauAddress.findFirst({
      where: { restauId: restaurantId },
    });
  }

  save({
    address,
    commune,
    longitude,
    latitude,
    restauId,
  }: CreateRestauAddressInput): Promise<RestauAddress> {
    return this.prismaService.restauAddress.create({
      data: { address, commune, longitude, latitude, restauId },
    });
  }
}
