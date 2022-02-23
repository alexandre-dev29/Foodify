import { Injectable } from '@nestjs/common';
import { PrismaService, RepositoryData } from '@food-delivery/shared-types';
import { UserRole } from './entities/user-role.entity';
import { GraphQLError } from 'graphql';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class UserRoleService implements RepositoryData<UserRole> {
  constructor(
    private prismaService: PrismaService,
    @InjectTwilio() private twilioClient: TwilioClient
  ) {}

  delete(id: string): Promise<UserRole> {
    return this.prismaService.role.delete({ where: { roleId: id } });
  }

  findAll(): Promise<UserRole[]> {
    return this.prismaService.role.findMany();
  }

  findById(id: string): Promise<UserRole> {
    return this.prismaService.role.findUnique({ where: { roleId: id } });
  }

  async save(creationInput: string): Promise<UserRole | any> {
    const foundedRole = await this.prismaService.role.findFirst({
      where: { userRole: creationInput },
    });

    if (!foundedRole) {
      return this.prismaService.role.create({
        data: { userRole: creationInput },
      });
    } else {
      return new GraphQLError('This user role already exists');
    }
  }
}
