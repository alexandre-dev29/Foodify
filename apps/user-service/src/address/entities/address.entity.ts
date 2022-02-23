import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field(() => String)
  addressId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  longitude: string;

  @Field(() => String)
  latitude: string;
}
