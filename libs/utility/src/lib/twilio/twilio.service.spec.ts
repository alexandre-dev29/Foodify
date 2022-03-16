import { Test, TestingModule } from '@nestjs/testing';
import { TwilioService } from './twilio.service';
import { UtilityModule } from '@food-delivery/utility';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TwilioService', () => {
  let service: TwilioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilityModule, ConfigModule],
      providers: [TwilioService, ConfigService],
    }).compile();

    service = module.get<TwilioService>(TwilioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send Otp Number', async function () {
    const responseTwwilio = await service.SendOtpVerificationCode(
      '+243975344824'
    );
    expect(responseTwwilio.status).toBe('pending');
  });
  it('should try to validate Otp number', async function () {
    const responseTwilio = await service.checkTheVerificationCode(
      '+243975344824',
      '123456'
    );

    expect(responseTwilio.valid).toBeFalsy();
    expect(responseTwilio.status).not.toBe('approved');
  });
});
