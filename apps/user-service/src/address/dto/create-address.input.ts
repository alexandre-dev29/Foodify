import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String)
  address: string;

  @Field(() => Int)
  userId: string;

  @Field(() => String)
  longitude: string;

  @Field(() => String)
  latitude: string;
}
