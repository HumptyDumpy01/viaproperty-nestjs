import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class ExtraPricingInput {
  @Field((type) => String)
  @IsOptional()
  title: string;

  @Field()
  @IsOptional()
  price: number;
}
