import {CreateUserInput} from './create-user.input';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
