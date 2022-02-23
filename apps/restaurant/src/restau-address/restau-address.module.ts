import {Module} from '@nestjs/common';
import {RestauAddressService} from './restau-address.service';
import {RestauAddressResolver} from './restau-address.resolver';
import {PrismaService} from '@food-delivery/shared-types';

@Module({
  providers: [RestauAddressResolver, RestauAddressService, PrismaService],
})
export class RestauAddressModule {}
