import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExtraPricing {
  @Field()
  title: string;

  @Field()
  price: number;
}
