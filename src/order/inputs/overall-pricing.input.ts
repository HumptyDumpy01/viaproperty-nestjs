import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class OverallPricingInput {
  @Field()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @Field()
  @MinLength(2)
  @MaxLength(200)
  description: string;
}
