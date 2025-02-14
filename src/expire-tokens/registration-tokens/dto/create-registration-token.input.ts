import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateRegistrationTokenInput {
  @Field()
  @IsEmail()
  @MaxLength(1000)
  email: string;
}
