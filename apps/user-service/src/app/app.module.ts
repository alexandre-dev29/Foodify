import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { UserAddressModule } from '../address/address.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserRoleModule } from '../user-role/user-role.module';
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
    UserModule,
    UserAddressModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
