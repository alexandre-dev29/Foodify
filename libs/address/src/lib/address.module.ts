import { Module } from '@nestjs/common';
import { GlobalAddressModule } from './global-address/global-address.module';

@Module({
  providers: [],
  exports: [],
  imports: [GlobalAddressModule],
})
export class AddressModule {}
