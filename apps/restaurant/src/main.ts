import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { graphqlUploadExpress } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  //set firebase
  const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    storageBucket: 'gs://chatt-app-282b8.appspot.com',
  });
  await app.listen(3001);
}
bootstrap();
