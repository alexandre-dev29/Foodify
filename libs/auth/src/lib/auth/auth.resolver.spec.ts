import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from '@food-delivery/auth';
import {
  PrismaService,
  TwilioService,
  UtilityModule,
} from '@food-delivery/utility';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

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
        AuthResolver,
        AuthService,
        PrismaService,
        TwilioService,
        ConfigService,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
