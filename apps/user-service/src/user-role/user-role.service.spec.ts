import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService, UtilityModule } from '@food-delivery/utility';

describe('UserRoleService', () => {
  let service: UserRoleService;

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
      providers: [UserRoleService, PrismaService],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
