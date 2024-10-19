import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BalanceInput {
  @Field(() => Number, { defaultValue: 0 })
  total: number;
}
