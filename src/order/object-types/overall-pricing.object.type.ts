import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PricingType {
  @Field()
  title: string;
  @Field()
  description: string;
}
