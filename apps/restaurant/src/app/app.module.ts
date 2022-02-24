import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { RestauAddressModule } from '../restau-address/restau-address.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT_ACCESS_KEY'),
      }),
      inject: [ConfigService],
    }),
    RestaurantModule,
    RestauAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
