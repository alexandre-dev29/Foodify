import { Injectable } from '@nestjs/common';
import { PrismaService, RepositoryData } from '@food-delivery/shared-types';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';

@Injectable()
export class AddressService implements RepositoryData<Address> {
  constructor(private prismaService: PrismaService) {}
  delete(id: string): Promise<Address> {
    return this.prismaService.userAddress.delete({
      where: { addressId: id },
    });
  }

  findAll(): Promise<Address[]> {
    return this.prismaService.userAddress.findMany({});
  }

  findById(id: string): Promise<Address> {
    return this.prismaService.userAddress.findUnique({
      where: { addressId: id },
    });
  }

  findByUserId(userId: string): Promise<Address> {
    return this.prismaService.userAddress.findFirst({ where: { userId } });
  }

  save({
    address,
    latitude,
    longitude,
    commune,
    userId,
  }: CreateAddressInput): Promise<Address> {
    return this.prismaService.userAddress.create({
      data: {
        address,
        latitude,
        longitude,
        commune,
        userId,
      },
    });
  }
}
