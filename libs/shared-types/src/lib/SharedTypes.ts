import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';

export function sharedTypes(): string {
  return 'SharedTypes';
}

@Scalar('Upload')
export class Upload {
  description = 'Upload custom scalar type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }
}

@Scalar('ResponseAction')
export class ResponseAction {
  description? = 'Response action result';
  message: string;
  status: ResponseType;
  data: any;
}

export enum ResponseType {
  error,
  success,
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

export enum AuthOperationType {
  RESTAURANT,
  USER,
}

export interface RepositoryData<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<T>;
  save(creationInput: any): Promise<T>;
}
