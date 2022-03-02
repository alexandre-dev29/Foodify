import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => String)
  restauId: string;

  @Field(() => String)
  restauName: string;

  @Field(() => String)
  restauDescription: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  restauAddressId: string;

  @Field(() => String, { nullable: true })
  mainImageId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;
}
