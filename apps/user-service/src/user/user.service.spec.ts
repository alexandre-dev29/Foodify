import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { PrismaService, UtilityModule } from '@food-delivery/utility';

describe('UserService', () => {
  let service: UserService;

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
        UtilityModule,
      ],
      providers: [UserService, PrismaService, UserRoleService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async function () {
    const allusers = await service.findAll();
    expect(allusers.length).toBeGreaterThanOrEqual(1);
  });

  it('should find one user', async function () {
    const allusers = await service.findAll();
    const foundedUser = await service.findById(allusers[0].userId);
    expect(foundedUser).not.toBeNull();
  });
});
