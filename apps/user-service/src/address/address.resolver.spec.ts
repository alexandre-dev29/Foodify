import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@food-delivery/shared-types';
import { UserService } from '../user/user.service';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

describe('AddressResolver', () => {
  let resolver: AddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('SECRET_JWT_ACCESS_KEY'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AddressResolver, AddressService, PrismaService, UserService],
    }).compile();

    resolver = module.get<AddressResolver>(AddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
