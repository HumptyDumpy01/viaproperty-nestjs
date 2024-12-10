import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RentalPeriodType {
  @Field(() => Date)
  from: Date;
  @Field(() => Date)
  to: Date;
}
