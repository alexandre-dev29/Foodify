import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserRoleModule } from '../user-role/user-role.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AddressModule } from '@food-delivery/address';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    AddressModule,
    UserModule,
    UserRoleModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
