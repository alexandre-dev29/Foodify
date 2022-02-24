import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UploadResponse } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  async uploadProfilePhoto(file): Promise<UploadResponse> {
    const bucket = admin.storage().bucket();
    return await bucket.upload(file, { gzip: true });
  }
}
