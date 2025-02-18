import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExtraPricingInput {
  @Field((_type) => String)
  title: string;

  @Field()
  price: number;
}
