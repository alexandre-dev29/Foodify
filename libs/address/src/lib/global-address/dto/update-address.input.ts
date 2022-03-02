import { CreateAddressInput } from './create-address.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  longitude: string;

  @Field(() => String, { nullable: true })
  latitude: string;
}
