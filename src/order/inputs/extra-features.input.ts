import { Field, InputType } from '@nestjs/graphql';
import { IsPositive, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ExtraFeaturesInput {
  @Field()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @Field()
  @IsPositive()
  price: number;

  @Field()
  @MinLength(2)
  @MaxLength(200)
  label: string;
}
