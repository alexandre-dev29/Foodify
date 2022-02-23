import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RestauAddress {
  @Field(() => String, { description: 'This is the id of address' })
  addressId: string;

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

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;
}
