import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '@food-delivery/shared-types';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantResolver, RestaurantService, PrismaService],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
