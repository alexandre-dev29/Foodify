import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { RestauAddressModule } from '../restau-address/restau-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Upload } from '@food-delivery/shared-types';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    RestaurantModule,
    RestauAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService, Upload],
})
export class AppModule {}
