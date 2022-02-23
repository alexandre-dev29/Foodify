import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  restauName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  restauDescription: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String)
  password: string;
}
