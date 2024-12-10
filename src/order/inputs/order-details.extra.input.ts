import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDateString } from 'class-validator';
import { Optional } from '@nestjs/common';

@InputType()
export class OrderDetailsExtraInput {
  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  refundAvailable: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Optional()
  @IsBoolean()
  refundRequested: boolean;

  @Field(() => String, { defaultValue: null })
  @IsDateString()
  date: string;
}
