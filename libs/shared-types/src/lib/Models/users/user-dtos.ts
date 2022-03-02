import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  userRole: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
