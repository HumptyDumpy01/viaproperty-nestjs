import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BalanceType {
  @Field(() => Number, { defaultValue: 0 })
  total: number;
}
