import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResolver } from './user-role.resolver';
import { UserRoleService } from './user-role.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService, UtilityModule } from '@food-delivery/utility';
import { UserRole } from './entities/user-role.entity';

describe('UserRoleResolver', () => {
  let resolver: UserRoleResolver;
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
      providers: [
        UserRoleResolver,
        UserRoleService,
        UserService,
        PrismaService,
      ],
    }).compile();

    resolver = module.get<UserRoleResolver>(UserRoleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should create a role', async function () {
    createdRole = await resolver.createUserRole('TempRole');
    expect(createdRole.userRole).toBe('TempRole');
  });

  it('should get one role', async function () {
    const foundedrole = await resolver.role(createdRole.roleId);
    expect(foundedrole).not.toBeNull();
    expect(foundedrole.userRole).toBe(createdRole.userRole);
  });

  it('should get list of all roles', async function () {
    const listOfRoles = await resolver.roles();
    expect(listOfRoles.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete a role', async function () {
    const deletedPap = await resolver.removeUserRole(createdRole.roleId);
    expect(deletedPap).not.toBeNull();
    expect(deletedPap.userRole).toBe(createdRole.userRole);
  });
});
