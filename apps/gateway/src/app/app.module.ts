import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusGatewayDriver,
  MercuriusGatewayDriverConfig,
} from '@nestjs/mercurius';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusGatewayDriverConfig>({
      driver: MercuriusGatewayDriver,
      cache: 10,
      gateway: {
        services: [
          {
            name: 'users',
            url: 'http://localhost:3001/graphql',
            mandatory: true,
          },
          {
            name: 'restaurants',
            url: 'http://localhost:3002/graphql',
            mandatory: true,
          },
        ],
        pollingInterval: 5000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
