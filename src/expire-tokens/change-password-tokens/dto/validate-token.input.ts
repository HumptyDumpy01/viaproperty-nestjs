import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class ValidateTokenInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(6, 6)
  @Field()
  token: string;
}
