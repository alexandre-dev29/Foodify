import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  AuthOperationType,
  CreateUserInput,
  LoginResponse,
  User,
} from '@food-delivery/shared-types';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  async AskingForOtpCode(@Args('phoneNumber') phoneNumber: string) {
    return this.authService.askingForOtpCode(phoneNumber);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('phoneNumber') phoneNumber: string,
    @Args('password') password: string
    // @Context() context: any,
  ) {
    return this.authService.loginUser(
      phoneNumber,
      password,
      AuthOperationType.USER
    );
  }

  @Mutation(() => User)
  registerUser(
    @Args('createUserInput')
    { userRole, username, password, phoneNumber }: CreateUserInput
  ): Promise<User> {
    return this.authService
      .registerUser(
        { username, userRole, password, phoneNumber },
        AuthOperationType.USER
      )
      .then((user) => ({ ...user, password: '' }));
  }

  @Mutation(() => Boolean)
  async ConfirmPhoneNumber(
    @Args('phoneNumber') phoneNumber: string,
    @Args('otpCode') otpCode: string
  ) {
    return this.authService.confirmPhoneNumber(phoneNumber, otpCode);
  }
}
