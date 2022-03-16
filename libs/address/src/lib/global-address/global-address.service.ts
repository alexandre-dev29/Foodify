import { Injectable } from '@nestjs/common';
import { PrismaService } from '@food-delivery/utility';
import {
  Address,
  CreateAddressInput,
  UpdateAddressInput,
} from '@food-delivery/address';

@Injectable()
export class GlobalAddressService {
  constructor(private prismaService: PrismaService) {}

  updateAdress(
    id: string,
    updateRestauAddressInput: UpdateAddressInput
  ): Promise<Address> {
    return this.prismaService.address.update({
      where: { addressId: id },
      data: updateRestauAddressInput,
    });
  }

  delete(id: string): Promise<Address> {
    return this.prismaService.address.delete({
      where: { addressId: id },
    });
  }

  findAll(): Promise<Address[]> {
    return this.prismaService.address.findMany({});
  }

  findById(id: string): Promise<Address> {
    return this.prismaService.address.findUnique({
      where: { addressId: id },
    });
  }

  findByRestaurantId(restaurantId: string): Promise<Address> {
    return this.prismaService.address.findFirst({
      where: { restauId: restaurantId },
    });
  }

  findByUserId(userId: string): Promise<Address> {
    return this.prismaService.address.findFirst({
      where: { userId: userId },
    });
  }

  save({
    address,
    commune,
    longitude,
    latitude,
    restauId,
    userId,
  }: CreateAddressInput): Promise<Address> {
    return this.prismaService.address.create({
      data: { address, commune, longitude, latitude, restauId, userId },
    });
  }
}
