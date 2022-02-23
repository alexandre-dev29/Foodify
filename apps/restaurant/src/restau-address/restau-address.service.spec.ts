import { Test, TestingModule } from '@nestjs/testing';
import { RestauAddressService } from './restau-address.service';
import { PrismaService } from '@food-delivery/shared-types';
import { RestauAddress } from './entities/restau-address.entity';

describe('RestauAddressService', () => {
  let service: RestauAddressService;
  let currentIdAdresse: RestauAddress;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestauAddressService, PrismaService],
    }).compile();

    service = module.get<RestauAddressService>(RestauAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new adress', async function () {
    const numberBefore = await service.findAll();
    const insertedItem = await service.save({
      address: 'alexandre adresse',
      commune: 'Katuba1',
      latitude: '122',
      longitude: '55522',
      restauId: '1',
    });
    currentIdAdresse = insertedItem;
    const numberAfter = await service.findAll();

    expect(numberAfter.length).toBeGreaterThan(numberBefore.length);
    expect(insertedItem.commune).toEqual('Katuba1');
  });

  it('should return list of addresses', async function () {
    const numberBefore = await service.findAll();
    expect(numberBefore.length).toBeGreaterThan(0);
  });

  it('should return one restau address', async function () {
    const foundedAddress = await service.findById(currentIdAdresse.addressId);
    expect(foundedAddress.commune).toEqual('Katuba1');
  });

  it('should update one adresse', function () {
    service
      .updateAdress(currentIdAdresse.addressId, {
        address: 'Mine',
        commune: currentIdAdresse.commune,
        longitude: currentIdAdresse.longitude,
        latitude: currentIdAdresse.latitude,
      })
      .then((edited) => {
        expect(edited.address).toEqual('Mine');
      });
  });
  it('should delete one adress', function () {
    service.delete(currentIdAdresse.addressId).then((currentDeleted) => {
      expect(currentDeleted.commune).toEqual(currentIdAdresse.commune);
    });
  });
});
