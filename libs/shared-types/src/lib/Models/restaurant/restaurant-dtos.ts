import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  restauName: string;

  @Field(() => String)
  restauDescription: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;
}

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => String)
  id: string;
}
