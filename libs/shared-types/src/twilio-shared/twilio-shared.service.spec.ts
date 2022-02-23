import { Test, TestingModule } from '@nestjs/testing';
import { TwilioSharedService } from './twilio-shared.service';

describe('TwilioSharedService', () => {
  let service: TwilioSharedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwilioSharedService],
    }).compile();

    service = module.get<TwilioSharedService>(TwilioSharedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
