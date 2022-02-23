import { CreateRestauAddressInput } from './create-restau-address.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestauAddressInput extends PartialType(
  CreateRestauAddressInput
) {
  @Field(() => String, { nullable: true })
  commune: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  longitude: string;

  @Field(() => String, { nullable: true })
  latitude: string;
}
