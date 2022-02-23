import { Test, TestingModule } from '@nestjs/testing';
import { RestauAddressResolver } from './restau-address.resolver';
import { RestauAddressService } from './restau-address.service';
import { PrismaService } from '@food-delivery/shared-types';

describe('RestauAddressResolver', () => {
  let resolver: RestauAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestauAddressResolver, RestauAddressService, PrismaService],
    }).compile();

    resolver = module.get<RestauAddressResolver>(RestauAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
