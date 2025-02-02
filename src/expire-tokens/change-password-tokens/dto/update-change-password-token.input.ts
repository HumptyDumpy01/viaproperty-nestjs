import { CreateChangePasswordTokenInput } from './create-change-password-token.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChangePasswordTokenInput extends PartialType(CreateChangePasswordTokenInput) {
  @Field(() => Int)
  id: number;
}
