import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioSharedService {
  constructor(
    @InjectTwilio() private twilioClient: TwilioClient,
    private configService: ConfigService
  ) {}

  async SendOtpVerificationCode(phoneNumber: string) {
    return this.twilioClient.verify
      .services(this.configService.get('TWILIO_VERIFICATION_SERVICE_SID'))
      .verifications.create({
        to: phoneNumber,
        channel: 'sms',
      });
  }

  async checkTheVerificationCode(phoneNumber: string, optCode: string) {
    return this.twilioClient.verify
      .services(this.configService.get('TWILIO_VERIFICATION_SERVICE_SID'))
      .verificationChecks.create({ to: phoneNumber, code: optCode });
  }
}
