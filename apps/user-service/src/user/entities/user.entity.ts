import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String)
  username: string;

  @Field(() => Boolean)
  isPhoneConfirmed: boolean;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  completeName: string;

  @Field(() => String, { nullable: true })
  tokenId: string;

  @Field(() => String)
  userRoleId: string;

  @Field(() => String, { nullable: true })
  userAddressId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;
}
