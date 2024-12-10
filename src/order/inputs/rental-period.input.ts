import { Field, InputType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';

@InputType()
export class RentalPeriodInput {
  @Field()
  @IsDateString()
  from: string;

  @Field()
  @IsDateString()
  to: string;
}
