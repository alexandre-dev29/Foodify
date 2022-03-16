import { Injectable } from '@nestjs/common';
import { RepositoryData, User } from '@food-delivery/shared-types';
import { PrismaService } from '@food-delivery/utility';

@Injectable()
export class UserService implements RepositoryData<User> {
  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<User[] | never> {
    return this.prismaService.user.findMany();
  }

  delete(id: string): Promise<User | never> {
    return this.prismaService.user.delete({ where: { userId: id } });
  }

  async findById(id: string): Promise<User | never> {
    const userResult = await this.prismaService.user.findUnique({
      where: { userId: id },
    });
    return { ...userResult, password: '' };
  }

  save(creationInput: never): Promise<User> {
    return Promise.resolve(creationInput);
  }
}
