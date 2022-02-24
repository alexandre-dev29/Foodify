import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  restauName: string;

  @Field(() => String)
  restauDescription: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;
}
