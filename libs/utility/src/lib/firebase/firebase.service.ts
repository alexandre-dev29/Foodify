import { Injectable } from '@nestjs/common';
import { UploadResponse } from '@google-cloud/storage';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async uploadProfilePhoto(file): Promise<UploadResponse> {
    const bucket = admin.storage().bucket();
    return await bucket.upload(file, { gzip: true });
  }
}
