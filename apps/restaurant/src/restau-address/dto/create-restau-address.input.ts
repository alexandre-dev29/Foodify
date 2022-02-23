import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestauAddressInput {
  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  longitude: string;

  @Field(() => String)
  latitude: string;

  @Field(() => String)
  restauId: string;
}
