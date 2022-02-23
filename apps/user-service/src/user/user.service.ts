import { Injectable } from '@nestjs/common';
import {
  LoginResponse,
  PrismaService,
  RepositoryData,
  TwilioSharedService,
} from '@food-delivery/shared-types';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { GraphQLError } from 'graphql';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService implements RepositoryData<User> {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private twilioService: TwilioSharedService
  ) {}

  async loginUser(
    phoneNumber: string,
    password: string
  ): Promise<LoginResponse | any> {
    const user = await this.prismaService.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await this.jwtService.signAsync(
        {
          phoneNUmber: phoneNumber,
          userId: user.userId,
          username: user.username,
          userRole: user.userRoleId,
        },
        {
          expiresIn: '60m',
        }
      );
      await this.prismaService.tokens.deleteMany({
        where: { userId: user.userId },
      });
      await this.prismaService.tokens.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.userId,
          token: accessToken,
        },
      });
      return {
        accessToken,
        user: {
          userId: user.userId,
          username: user.username,
          phoneNumber: user.phoneNumber,
          completeName: user.completeName,
        },
      } as LoginResponse;
    } else {
      return new GraphQLError(
        'the password or email is invalid please try again'
      );
    }
  }

  findAll(): Promise<User[] | any> {
    return this.prismaService.user.findMany();
  }

  delete(id: string): Promise<User | any> {
    return this.prismaService.user.delete({ where: { userId: id } });
  }

  async findById(id: string): Promise<User | any> {
    const userResult = await this.prismaService.user.findUnique({
      where: { userId: id },
    });
    return { ...userResult, password: '' };
  }

  async save({
    username,
    password,
    phoneNumber,
  }: CreateUserInput): Promise<User | any> {
    const isUserExist = await this.prismaService.user.findUnique({
      where: { username: username },
    });
    if (isUserExist) {
      return new GraphQLError(
        'The User Already Exist please try another username'
      );
    } else {
      const roleRecup = await this.prismaService.role.findFirst({
        where: { userRole: 'User' },
      });
      const hashedPassword = await bcrypt
        .hash(password, 10)
        .then((value) => value);

      try {
        const insertedUser = await this.prismaService.user.create({
          data: {
            username: username,
            password: hashedPassword,
            userRoleId: roleRecup.roleId,
            phoneNumber: phoneNumber,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        const responseTwilio = await this.twilioService.SendOtpVerificationCode(
          insertedUser.phoneNumber
        );
        if (responseTwilio.status == 'pending') {
          return insertedUser;
        } else {
          return new GraphQLError(
            'There was an error while validating your phone number, please try again later'
          );
        }
      } catch (e) {
        if (e.meta.target && e.meta.target == 'User_phoneNumber_key') {
          return new GraphQLError(
            'This phone Number already exist Please try a different or if you loose your password try the forgot password'
          );
        } else {
          return new GraphQLError(
            'An Error occur while registering please try again later'
          );
        }
      }
    }
  }

  async confirmPhoneNumber(
    phoneNumber: string,
    otpCode: string
  ): Promise<boolean | any> {
    const foundedUser = await this.prismaService.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (foundedUser) {
      const confirmation = await this.twilioService.checkTheVerificationCode(
        phoneNumber,
        otpCode
      );

      if (!confirmation.valid || confirmation.status !== 'approved') {
        throw new GraphQLError('The code is not correct');
      } else {
        await this.prismaService.user.update({
          where: { userId: foundedUser.userId },
          data: { isPhoneConfirmed: true },
        });
        return true;
      }
    } else {
      return new GraphQLError("This phone number doesn't exist ");
    }
  }

  async askingForOtpCode(phoneNumber: string): Promise<boolean | any> {
    const foundedUser = await this.prismaService.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    if (foundedUser) {
      const responseTwilio = await this.twilioService.SendOtpVerificationCode(
        phoneNumber
      );
      if (responseTwilio.status == 'pending') {
        return true;
      } else {
        return new GraphQLError(
          'There was an error while validating your phone number, please try again later'
        );
      }
    } else {
      return new GraphQLError("This phone number doesn't exist ");
    }
  }
}
