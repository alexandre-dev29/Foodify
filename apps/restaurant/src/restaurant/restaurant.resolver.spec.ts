import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { FirebaseService, PrismaService } from '@food-delivery/utility';
import { GlobalAddressService } from '@food-delivery/address';
import { Restaurant } from '@food-delivery/shared-types';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;
  let createdRestaurant: Restaurant;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantResolver,
        RestaurantService,
        PrismaService,
        GlobalAddressService,
        FirebaseService,
      ],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should create a new restaurant', async function () {
    const phoneNumber = '+243975344824';
    const restauName = 'Barcelos';
    const restauDescription = 'This is an integration test of restaurant';
    createdRestaurant = await resolver.createRestaurant({
      phoneNumber,
      restauName,
      restauDescription,
    });
    expect(createdRestaurant.restauName).toBe(restauName);
    expect(createdRestaurant.restauDescription).toBe(restauDescription);
  });

  it('should retrieve one restaurant', async function () {
    const restaurantFounded = await resolver.getOneRestaurant(
      createdRestaurant.restauId
    );
    expect(restaurantFounded).toBeDefined();
    expect(restaurantFounded.restauName).toBe(createdRestaurant.restauName);
  });

  it('should found list of restaurant', async function () {
    const allRestaurant = await resolver.getAllRestaurants();
    expect(allRestaurant.length).toBeGreaterThanOrEqual(1);
  });

  it('should activate a restaurant', async function () {
    const activated = await resolver.activateRestaurant(
      createdRestaurant.restauId
    );
    expect(activated).toBeTruthy();
  });
  it('should update the restaurant address', async function () {
    const commune = 'Kampemba';
    const address = 'Centre ville';
    const longitude = '88456445';
    const latitude = '445641644';
    const updatedRestaurant = await resolver.updateRestaurantAddress(
      createdRestaurant.restauId,
      {
        latitude,
        longitude,
        address,
        commune,
      }
    );

    expect(updatedRestaurant.restauAddressId).not.toBeNull();
    const currentAddress = await prismaService.address.findUnique({
      where: { addressId: updatedRestaurant.restauAddressId },
    });
    expect(currentAddress.latitude).toBe(latitude);
    expect(currentAddress.longitude).toBe(longitude);
    expect(currentAddress.address).toBe(address);
  });
});
