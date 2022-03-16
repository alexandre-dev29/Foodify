import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '@food-delivery/utility';
import { GlobalAddressService } from '@food-delivery/address';
import { Restaurant } from '@food-delivery/shared-types';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let prismaService: PrismaService;
  let createdRestaurant: Restaurant;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService, PrismaService, GlobalAddressService],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new restaurant', async function () {
    const phoneNumber = '+243975344824';
    const restauName = 'Barcelos';
    const restauDescription = 'This is an integration test of restaurant';
    createdRestaurant = await service.save({
      phoneNumber,
      restauName,
      restauDescription,
    });
    expect(createdRestaurant.restauName).toBe(restauName);
    expect(createdRestaurant.restauDescription).toBe(restauDescription);
  });

  it('should retrieve one restaurant', async function () {
    const restaurantFounded = await service.findById(
      createdRestaurant.restauId
    );
    expect(restaurantFounded).toBeDefined();
    expect(restaurantFounded.restauName).toBe(createdRestaurant.restauName);
  });

  it('should found list of restaurant', async function () {
    const allRestaurant = await service.findAll();
    expect(allRestaurant.length).toBeGreaterThanOrEqual(1);
  });

  it('should activate a restaurant', async function () {
    const allRestaurant = await service.activateRestaurant(
      createdRestaurant.restauId
    );
    expect(allRestaurant.isActive).toBeTruthy();
  });

  it('should update the restaurant address', async function () {
    const commune = 'Kampemba';
    const address = 'Centre ville';
    const longitude = '88456445';
    const latitude = '445641644';
    const updatedRestaurant = await service.updateAddressRestaurant(
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

  it('should delete one restaurant', async function () {
    const deletedRestaurant = await service.delete(createdRestaurant.restauId);
    const founded = await service.findById(createdRestaurant.restauId);
    expect(deletedRestaurant.restauName).toBe(createdRestaurant.restauName);
    expect(founded).toBe(null);
  });
});
