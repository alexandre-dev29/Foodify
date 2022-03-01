import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  longitude: string;

  @Field(() => String)
  latitude: string;

  @Field(() => String, { nullable: true })
  restauId: string;

  @Field(() => String, { nullable: true })
  userId: string;
}
