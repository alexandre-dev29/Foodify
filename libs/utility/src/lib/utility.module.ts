import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UtilityModule {}
