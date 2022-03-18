import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService, UtilityModule } from '@food-delivery/utility';
import { UserRole } from './entities/user-role.entity';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let createdRole: UserRole;

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

  it('should create a role', async function () {
    createdRole = await service.save('TempRole');
    expect(createdRole.userRole).toBe('TempRole');
  });

  it('should get one role', async function () {
    const foundedrole = await service.findById(createdRole.roleId);
    expect(foundedrole).not.toBeNull();
    expect(foundedrole.userRole).toBe(createdRole.userRole);
  });

  it('should get list of all roles', async function () {
    const listOfRoles = await service.findAll();
    expect(listOfRoles.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete a role', async function () {
    const deletedPap = await service.delete(createdRole.roleId);
    expect(deletedPap).not.toBeNull();
    expect(deletedPap.userRole).toBe(createdRole.userRole);
  });
});
