import { Scalar } from '@nestjs/graphql';

export function sharedTypes(): string {
  return 'SharedTypes';
}

@Scalar('LoginResponse')
export class LoginResponse {
  accessToken: string;
  user: any;
}

@Scalar('MutationResponse')
export class MutationResponse {
  responseType: 'Success' | 'Error';
  message: string;
  data?: any;
}

@Scalar('RefreshTokenResponse')
export class RefreshTokenResponse {
  responseType: 'Success' | 'Error';
  message: string;
  accessToken?: any;
}

export enum RestaurantRole {
  ADMIN,
  AGENT,
}

export interface RepositoryData<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<T>;
  save(creationInput: any): Promise<T>;
}
