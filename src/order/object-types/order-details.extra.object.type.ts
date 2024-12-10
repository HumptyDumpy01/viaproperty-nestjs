import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderDetailsExtraType {
  @Field()
  refundAvailable: boolean;

  @Field()
  refundRequested: boolean;

  @Field()
  date: string;
}
