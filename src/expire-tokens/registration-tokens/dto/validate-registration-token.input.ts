import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class ValidateRegistrationTokenInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Length(6, 6)
  token: string;
}
